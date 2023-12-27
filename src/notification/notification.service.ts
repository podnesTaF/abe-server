import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as admin from "firebase-admin";
import { Content } from "src/content/entities/content.entity";
import { Team } from "src/teams/entities/team.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationEntity } from "./entities/notification.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createUserNotification(
    createNotificationDto: CreateNotificationDto,
    senderId: number,
  ) {
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
      relations: ["manager.teams"],
    });

    const receivers: User[] = [];

    if (createNotificationDto.type === "team") {
      const teamId = createNotificationDto.receivers[0];
      if (!sender.manager.teams.some((team) => team.id === teamId))
        throw new BadRequestException(
          "You can send notification only to your team",
        );

      const team = await this.teamRepository.findOne({
        where: { id: teamId },
        relations: ["players.user", "coach.user"],
      });

      if (!team) throw new BadRequestException("Team not found");

      for (const player of team.players) {
        receivers.push(player.user);
      }

      receivers.push(team.coach.user);
    } else {
      for (const receiverId of createNotificationDto.receivers) {
        const receiver = await this.userRepository.findOne({
          where: { id: receiverId },
        });
        receivers.push(receiver);
      }
    }

    const notification = await this.notificationRepository.save({
      ...createNotificationDto,
      sender,
      receivers,
    });

    const contents: Content[] = [];

    for (const content of createNotificationDto.contents) {
      const created = await this.contentRepository.save({
        ...content,
        notificationId: notification.id,
      });
      contents.push(created);
    }

    notification.contents = contents;

    await this.notificationRepository.save(notification);

    const tokens = receivers
      .map((user) => user.expoPushToken)
      .filter((token) => token);

    if (tokens.length > 0) {
      await this.sendPushNotification(
        tokens,
        "There are new messages sent to you",
      );
    }

    return { success: true };
  }

  async createSystemNotification(createNotificationDto: CreateNotificationDto) {
    let receivers: User[] = [];

    if (createNotificationDto.type === "all") {
      const allUsers = await this.userRepository.find();
      receivers = allUsers;
    } else {
      for (const receiverId of createNotificationDto.receivers) {
        const receiver = await this.userRepository.findOne({
          where: { id: receiverId },
        });
        receivers.push(receiver);
      }
    }

    const notification = await this.notificationRepository.save({
      ...createNotificationDto,
      receivers,
    });

    const contents: Content[] = [];

    for (const content of createNotificationDto.contents) {
      const created = await this.contentRepository.save({
        ...content,
        notificationId: notification.id,
      });
      contents.push(created);
    }

    notification.contents = contents;

    const updated = await this.notificationRepository.save(notification);

    delete updated.receivers;

    return updated;
  }

  getUserReceivedNotifications(userId: number) {
    return this.notificationRepository.find({
      where: { receivers: { id: userId } },
      relations: ["contents", "sender", "sender.image"],
      order: { createdAt: "DESC" },
    });
  }

  getUserSentNotification(userId: number) {
    return this.notificationRepository.find({
      where: { sender: { id: userId } },
      relations: ["contents", "sender", "sender.image"],
      order: { createdAt: "DESC" },
    });
  }

  findAll() {
    return `This action returns all notification`;
  }

  async findOne({
    notificationId,
    userId,
  }: {
    notificationId: number;
    userId: number;
  }) {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
      relations: ["contents", "sender", "receivers", "sender.image"],
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (
      !notification.receivers.some((receiver) => receiver.id === userId) &&
      notification.sender?.id !== userId
    ) {
      throw new Error("You are not authorized to view this notification");
    }

    if (notification.sender?.id !== userId) {
      notification.status = "read";
    }

    return this.notificationRepository.save(notification);
  }

  async sendPushNotification(tokens: string[], message: string) {
    const messages = tokens.map((token) => ({
      token: token,
      notification: {
        title: "New Message",
        body: message,
      },
    }));

    try {
      const response = await admin.messaging().sendEach(messages);

      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            console.log(`Failed to send message to token: ${tokens[idx]}`);
            failedTokens.push(tokens[idx]);
          }
        });

        if (failedTokens.length > 0) {
          failedTokens.forEach((token) => this.removeFailedToken(token));
        }
      }

      return response;
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  removeFailedToken(token: string) {
    return this.userRepository.update(
      { expoPushToken: token },
      { expoPushToken: null },
    );
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
