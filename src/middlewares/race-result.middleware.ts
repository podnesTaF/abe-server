import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ParseRaceResultMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // check if body exists
    if (!req.body) {
      return next();
    }

    if (req.body && typeof req.body === "string") {
      const dataArray = req.body.split(";");
      // Map the data based on their expected order in the string
      req.body = {
        RD_ID: dataArray[0],
        Bib: dataArray[1],
        RD_Transponder: dataArray[2],
        RD_Time: dataArray[3],
      };
    }
    next();
  }
}
