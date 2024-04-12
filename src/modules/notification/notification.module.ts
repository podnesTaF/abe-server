import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/modules/content/entities/content.entity";
import { PushToken } from "src/modules/push-token/entities/push-token.entity";
import { TokenService } from "src/modules/push-token/push-token.service";
import { Team } from "src/modules/teams/entities/team.entity";
import { User } from "src/modules/users/entities/user.entity";
import { NotificationEntity } from "./entities/notification.entity";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      NotificationEntity,
      PushToken,
      Content,
      Team,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, TokenService],
  exports: [NotificationService],
})
export class NotificationModule {}
