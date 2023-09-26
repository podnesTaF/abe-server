import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Race } from 'src/race/entities/race.entity';
import { RunnerResult } from 'src/runner-results/entities/runner-results.entity';
import { RunnerResultsService } from 'src/runner-results/runner-results.service';
import { Split } from 'src/splits/entities/splits.entity';
import { SplitsService } from 'src/splits/splits.service';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TeamResult } from './entities/team-results.entity';
import { TeamResultsController } from './team-results.controller';
import { TeamResultsService } from './team-results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamResult,
      Race,
      Team,
      RunnerResult,
      User,
      Country,
      Split,
    ]),
  ],
  controllers: [TeamResultsController],
  providers: [
    TeamResultsService,
    RunnerResultsService,
    SplitsService,
    UserService,
    CountryService,
  ],
})
export class TeamResultsModule {}
