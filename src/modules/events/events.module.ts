import { Storage } from "@google-cloud/storage";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/modules/content/entities/content.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { FileService } from "src/modules/file/file.service";
import { Location } from "src/modules/locations/entities/locations.entity";
import { LocationsService } from "src/modules/locations/locations.service";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaService } from "src/modules/media/media.service";
import { PrizeCategory } from "src/modules/prizes/entities/prize-category";
import { PrizeEntity } from "src/modules/prizes/entities/prize.entity";
import { PrizesService } from "src/modules/prizes/prizes.service";
import { User } from "src/modules/users/entities/user.entity";
import { Event } from "./entities/event.entity";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Location,
      PrizeEntity,
      Country,
      Media,
      Content,
      PrizeCategory,
      User,
    ]),
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
    LocationsService,
    PrizesService,
    FileService,
    Storage,
    CountryService,
    MediaService,
  ],
  exports: [EventsService],
})
export class EventsModule {}
