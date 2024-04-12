import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { ManagerController } from "../controllers/manager.controller";
import { Manager } from "../entities/manager.entity";
import { ManagerService } from "../services/manager.service";

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Country])],
  controllers: [ManagerController],
  providers: [ManagerService, CountryService],
  exports: [ManagerService],
})
export class ManagerModule {}
