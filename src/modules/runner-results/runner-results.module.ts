import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/modules/bests/entities/best.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { Split } from "src/modules/splits/entities/splits.entity";
import { SplitsService } from "src/modules/splits/splits.service";
import { TeamResult } from "src/modules/team-results/entities/team-results.entity";
import { Manager } from "src/modules/users/entities/manager.entity";
import { Runner } from "src/modules/users/entities/runner.entity";
import { User } from "src/modules/users/entities/user.entity";
import { RunnerService } from "src/modules/users/services/runner.service";
import { RunnerResult } from "./entities/runner-results.entity";
import { RunnerResultsController } from "./runner-results.controller";
import { RunnerResultsService } from "./runner-results.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RunnerResult,
      TeamResult,
      Runner,
      Split,
      Country,
      Best,
      Manager,
      User,
    ]),
  ],
  controllers: [RunnerResultsController],
  providers: [
    RunnerResultsService,
    SplitsService,
    RunnerService,
    CountryService,
  ],
  exports: [RunnerResultsService],
})
export class RunnerResultsModule {}
