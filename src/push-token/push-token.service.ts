import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { In, Repository } from "typeorm";
import { PushToken } from "./entities/push-token.entity";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(PushToken)
    private pushTokenRepository: Repository<PushToken>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOrUpdateToken(
    userId: number | null,
    token: string,
    deviceIdentifier?: string,
  ) {
    let user = null;
    if (userId) {
      user = await this.userRepository.findOne({ where: { id: userId } });
    }

    let existingToken = await this.pushTokenRepository.findOne({
      where: { token },
    });

    if (existingToken) {
      existingToken.user = user;
      existingToken.deviceIdentifier = deviceIdentifier;
      await this.pushTokenRepository.save(existingToken);
    } else {
      const newToken = this.pushTokenRepository.create({
        token,
        user,
        deviceIdentifier,
      });
      await this.pushTokenRepository.save(newToken);
    }
  }

  findAllReceiversTokens(receiverIds: number[]): Promise<Partial<PushToken>[]> {
    return this.pushTokenRepository.find({
      where: { user: { id: In(receiverIds) } },
      select: ["token"],
    });
  }

  async removeToken(token: string) {
    await this.pushTokenRepository.delete({ token });
  }
}
