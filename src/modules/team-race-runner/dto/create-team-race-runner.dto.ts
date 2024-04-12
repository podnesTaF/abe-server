import { IsObject } from "class-validator";
import { RaceRegistration } from "src/modules/race-registration/entities/race-registration.entity";
import { Runner } from "src/modules/users/entities/runner.entity";

export class CreateTeamRaceRunnerDto {
  @IsObject()
  raceRegistration: RaceRegistration;

  @IsObject()
  runner: Runner;
}
