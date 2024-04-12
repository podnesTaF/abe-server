import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BestsService } from "src/modules/bests/bests.service";
import { Best } from "src/modules/bests/entities/best.entity";
import { ClubService } from "src/modules/club/club.service";
import { Club } from "src/modules/club/entities/club.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { Event } from "src/modules/events/entities/event.entity";
import { EventsService } from "src/modules/events/events.service";
import { FileService } from "src/modules/file/file.service";
import { Location } from "src/modules/locations/entities/locations.entity";
import { LocationsService } from "src/modules/locations/locations.service";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaService } from "src/modules/media/media.service";
import { PlayerEntity } from "src/modules/players/entities/player.entity";
import { PlayersService } from "src/modules/players/players.service";
import { PrizeCategory } from "src/modules/prizes/entities/prize-category";
import { PrizeEntity } from "src/modules/prizes/entities/prize.entity";
import { PrizesService } from "src/modules/prizes/prizes.service";
import { Coach } from "src/modules/users/entities/coach.entity";
import { Manager } from "src/modules/users/entities/manager.entity";
import { Runner } from "src/modules/users/entities/runner.entity";
import { Spectator } from "src/modules/users/entities/spectator.entity";
import { User } from "src/modules/users/entities/user.entity";
import { ManagerService } from "src/modules/users/services/manager.service";
import { RunnerService } from "src/modules/users/services/runner.service";
import { SpectatorService } from "src/modules/users/services/spectator.service";
import { Team } from "./entities/team.entity";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      PlayerEntity,
      Coach,
      Location,
      Event,
      Country,
      PrizeEntity,
      PrizeCategory,
      Best,
      Media,
      Club,
      Manager,
      Spectator,
      Runner,
      Content,
      User,
    ]),
  ],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    PlayersService,
    EventsService,
    PrizesService,
    LocationsService,
    CountryService,
    FileService,
    BestsService,
    MediaService,
    ClubService,
    ManagerService,
    RunnerService,
    SpectatorService,
  ],
  exports: [TeamsService],
})
export class TeamsModule {}
