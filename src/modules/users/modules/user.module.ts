import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/modules/bests/entities/best.entity";
import { ClubService } from "src/modules/club/club.service";
import { Club } from "src/modules/club/entities/club.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { NotificationEntity } from "src/modules/notification/entities/notification.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { RoleService } from "src/modules/role/role.service";
import { StripeService } from "src/modules/stripe/stripe.service";
import { UserRole } from "src/modules/user-role/entities/user-role.entity";
import { UserRoleService } from "src/modules/user-role/user-role.service";
import { VerifyMember } from "src/modules/verify-member/entities/verify-member.entity";
import { VerifyMemberService } from "src/modules/verify-member/verify-member.service";
import { UserController } from "../controllers/user.controller";
import { Manager } from "../entities/manager.entity";
import { Runner } from "../entities/runner.entity";
import { Spectator } from "../entities/spectator.entity";
import { User } from "../entities/user.entity";
import { ManagerService } from "../services/manager.service";
import { RunnerService } from "../services/runner.service";
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
      Runner,
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
    RunnerService,
  ],
  exports: [UserService],
})
export class UserModule {}
