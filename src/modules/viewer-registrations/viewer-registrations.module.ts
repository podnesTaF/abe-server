import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/modules/events/entities/event.entity";
import { FileService } from "src/modules/file/file.service";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaService } from "src/modules/media/media.service";
import { Member } from "src/modules/member/entities/member.entity";
import { User } from "src/modules/users/entities/user.entity";
import { ViewerRegistration } from "./entities/viewer-registration.entity";
import { ViewerRegistrationsController } from "./viewer-registrations.controller";
import { ViewerRegistrationsService } from "./viewer-registrations.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewerRegistration, Event, User, Media, Member]),
  ],
  controllers: [ViewerRegistrationsController],
  providers: [ViewerRegistrationsService, FileService, MediaService],
  exports: [ViewerRegistrationsService],
})
export class ViewerRegistrationsModule {}
