import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/modules/events/entities/event.entity";
import { RaceRegistration } from "src/modules/race-registration/entities/race-registration.entity";
import { RaceRegistrationService } from "src/modules/race-registration/race-registration.service";
import { TeamRaceRunner } from "src/modules/team-race-runner/entities/team-race-runner.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { Runner } from "src/modules/users/entities/runner.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Race } from "./entities/race.entity";
import { RaceController } from "./race.controller";
import { RaceService } from "./race.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Race,
      Event,
      Team,
      RaceRegistration,
      Runner,
      TeamRaceRunner,
      User,
    ]),
  ],
  controllers: [RaceController],
  providers: [RaceService, RaceRegistrationService],
})
export class RaceModule {}
