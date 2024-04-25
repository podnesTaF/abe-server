import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { RaceResultService } from "./race-result.service";

@Controller("race-result")
export class RaceResultController {
  constructor(private readonly raceResultService: RaceResultService) {}

  @Post()
  async createRaceResult(
    @Body()
    raceData: {
      RD_ID: string;
      Bib: string;
      RD_Transponder: string;
      RD_Time: string;
    },
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log("Received rawData:", raceData);
      res.status(HttpStatus.OK).send();
    } catch (error) {
      console.error("Error in createRaceResult:", error);
    }
  }
}

