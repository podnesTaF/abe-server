import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/bests/entities/best.entity";
import { ClubService } from "src/club/club.service";
import { Club } from "src/club/entities/club.entity";
import { Content } from "src/content/entities/content.entity";
import { CountryService } from "src/country/country.service";
import { Country } from "src/country/entity/country.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { Role } from "src/role/entities/role.entity";
import { RoleService } from "src/role/role.service";
import { StripeService } from "src/stripe/stripe.service";
import { UserRole } from "src/user-role/entities/user-role.entity";
import { UserRoleService } from "src/user-role/user-role.service";
import { VerifyMember } from "src/verify-member/entities/verify-member.entity";
import { VerifyMemberService } from "src/verify-member/verify-member.service";
import { UserController } from "../controllers/user.controller";
import { Manager } from "../entities/manager.entity";
import { Spectator } from "../entities/spectator.entity";
import { User } from "../entities/user.entity";
import { ManagerService } from "../services/manager.service";
import { SpectatorService } from "../services/spectator.service";
import { UserService } from "../services/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Club,
      Country,
      Manager,
      Spectator,
      VerifyMember,
      NotificationEntity,
      Content,
      Best,
      Role,
      UserRole,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ClubService,
    CountryService,
    ManagerService,
    SpectatorService,
    VerifyMemberService,
    RoleService,
    UserRoleService,
    StripeService,
    ConfigService,
  ],
  exports: [UserService],
})
export class UserModule {}
