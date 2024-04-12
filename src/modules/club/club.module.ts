import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { Manager } from "src/modules/users/entities/manager.entity";
import { Spectator } from "src/modules/users/entities/spectator.entity";
import { User } from "src/modules/users/entities/user.entity";
import { ManagerService } from "src/modules/users/services/manager.service";
import { SpectatorService } from "src/modules/users/services/spectator.service";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { Club } from "./entities/club.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Club, User, Country, Spectator, Manager]),
  ],
  controllers: [ClubController],
  providers: [ClubService, CountryService, SpectatorService, ManagerService],
  exports: [ClubService],
})
export class ClubModule {}
