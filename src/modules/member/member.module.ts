import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/modules/bests/entities/best.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { Event } from "src/modules/events/entities/event.entity";
import { FileService } from "src/modules/file/file.service";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaService } from "src/modules/media/media.service";
import { VerifyMember } from "src/modules/verify-member/entities/verify-member.entity";
import { VerifyMemberService } from "src/modules/verify-member/verify-member.service";
import { ViewerRegistration } from "src/modules/viewer-registrations/entities/viewer-registration.entity";
import { ViewerRegistrationsService } from "src/modules/viewer-registrations/viewer-registrations.service";
import { Member } from "./entities/member.entity";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Member,
      Best,
      Country,
      VerifyMember,
      Media,
      ViewerRegistration,
      Event,
    ]),
  ],
  controllers: [MemberController],
  providers: [
    MemberService,
    CountryService,
    VerifyMemberService,
    FileService,
    ViewerRegistrationsService,
    MediaService,
  ],
})
export class MemberModule {}
