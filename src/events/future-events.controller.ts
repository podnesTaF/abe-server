import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { Media } from "src/media/entities/media.entity";
import { FutureEventsService } from "./future-events.service";

@Controller("future-events")
export class FutureEventsController {
  constructor(private readonly futureEventsService: FutureEventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  create(
    @Body()
    dto: {
      title: string;
      season: string;
      introImage?: Media;
      description?: string;
      date?: Date;
      locationInfo?: string;
    },
  ) {
    return this.futureEventsService.create(dto);
  }

  @Get()
  findAll(@Query() queries: { announced: boolean }) {
    return this.futureEventsService.getAll(queries);
  }
}
