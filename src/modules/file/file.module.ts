import { Storage } from "@google-cloud/storage";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaService } from "src/modules/media/media.service";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [FileController],
  providers: [FileService, Storage, MediaService],
  exports: [FileService],
})
export class FileModule {}
