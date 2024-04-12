import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Race } from "src/modules/race/entities/race.entity";
import { TeamRaceRunner } from "src/modules/team-race-runner/entities/team-race-runner.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { Runner } from "src/modules/users/entities/runner.entity";
import { RaceRegistration } from "./entities/race-registration.entity";
import { RaceRegistrationController } from "./race-registration.controller";
import { RaceRegistrationService } from "./race-registration.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RaceRegistration,
      TeamRaceRunner,
      Runner,
      Team,
      Race,
    ]),
  ],
  controllers: [RaceRegistrationController],
  providers: [RaceRegistrationService],
  exports: [RaceRegistrationService],
})
export class RaceRegistrationModule {}
