import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/modules/bests/entities/best.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { Race } from "src/modules/race/entities/race.entity";
import { RunnerResult } from "src/modules/runner-results/entities/runner-results.entity";
import { RunnerResultsService } from "src/modules/runner-results/runner-results.service";
import { Split } from "src/modules/splits/entities/splits.entity";
import { SplitsService } from "src/modules/splits/splits.service";
import { Team } from "src/modules/teams/entities/team.entity";
import { Manager } from "src/modules/users/entities/manager.entity";
import { Runner } from "src/modules/users/entities/runner.entity";
import { User } from "src/modules/users/entities/user.entity";
import { RunnerService } from "src/modules/users/services/runner.service";
import { TeamResult } from "./entities/team-results.entity";
import { TeamResultsController } from "./team-results.controller";
import { TeamResultsService } from "./team-results.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamResult,
      Race,
      Team,
      RunnerResult,
      Country,
      Split,
      Runner,
      User,
      Manager,
      Best,
    ]),
  ],
  controllers: [TeamResultsController],
  providers: [
    TeamResultsService,
    RunnerResultsService,
    SplitsService,
    CountryService,
    RunnerService,
  ],
})
export class TeamResultsModule {}
