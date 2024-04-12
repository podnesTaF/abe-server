import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Content } from "src/modules/content/entities/content.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { NotificationEntity } from "src/modules/notification/entities/notification.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { RoleService } from "src/modules/role/role.service";
import { UserRoleService } from "src/modules/user-role/user-role.service";
import { VerifyMemberService } from "src/modules/verify-member/verify-member.service";
import { Repository } from "typeorm";
import { CompleteVerificationDto } from "../dtos/complete-verification.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
import { RunnerService } from "./runner.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private countryService: CountryService,
    private verifyRepository: VerifyMemberService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
    private runnerService: RunnerService,
  ) {}

  async create(dto: CreateUserDto) {
    const isDuplicate = await this.repository.findOne({
      where: [{ email: dto.email }],
    });

    if (isDuplicate) {
      throw new ForbiddenException("User with this email already exists");
    }
    const user = new User();

    user.name = dto.name;
    user.surname = dto.surname;
    user.email = dto.email;
    user.image = dto.image;
    user.avatar = dto.avatar;
    user.city = dto.city;
    user.password = await bcrypt.hash(dto.password, 10);

    let country = await this.countryService.returnIfExist({
      name: dto.country,
    });

    if (!country) {
      country = await this.countryService.create(dto.country);
    }
    user.country = country;
    user.interest = dto.interest;

    const newUser = await this.repository.save(user);

    const userRoles = await this.createRolesForUser({
      userId: newUser.id,
      roleNames: ["user"],
      roleIds: dto.roleIds,
    });

    // create runner entity
    if (userRoles.some((r) => r.role.name === "runner")) {
      const { success } = await this.runnerService.create(dto.runner, newUser);
      if (!success) {
        await this.repository.delete(newUser.id);
        throw new Error("Error creating runner entity");
      }
    }

    newUser.roles = userRoles;

    return this.repository.save(newUser);
  }

  async isDuplicate(email: string) {
    const isDuplicate = await this.repository.findOne({
      where: [{ email: email }],
    });
    if (isDuplicate) {
      return true;
    }

    return false;
  }

  async createRolesForUser({
    userId,
    roleIds,
    roleNames,
  }: {
    userId: number;
    roleNames?: string[];
    roleIds?: number[];
  }) {
    let roles: Role[] = [];

    // Fetch roles based on provided IDs or names
    if (roleIds?.length) {
      roles = await Promise.all(
        roleIds.map((rId) => this.roleService.findByCond({ id: rId })),
      );
    } else if (roleNames?.length) {
      roles = await Promise.all(
        roleNames.map((rName) => this.roleService.findByCond({ name: rName })),
      );
    }

    if (!roles.length) {
      throw new Error("Roles not found");
    }

    // Process each role
    const userRoles = await Promise.all(
      roles.map(async (role) => {
        const userRole = await this.userRoleService.createUserRole({
          userId,
          roleId: role.id,
        });
        return userRole;
      }),
    );

    return userRoles;
  }

  async completeVerification({
    user,
    token,
    password,
  }: CompleteVerificationDto) {
    try {
      const fullUser = await this.repository.findOne({
        where: { id: user.id },
      });

      fullUser.verified = true;

      const hashedPassword = await bcrypt.hash(password, 10);

      fullUser.password = hashedPassword;

      await this.verifyRepository.delete(token);

      await this.sendGreetingNotification(fullUser);

      return this.repository.save(fullUser);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async cancelRegistration(user: User) {
    await this.repository.delete(user.id);
  }

  async sendGreetingNotification(user: User) {
    const notification = this.notificationRepository.create({
      type: "system",
      receivers: [user],
      title: `${user.name} ${user.surname}, Welcome to Ace Battle Mile!`,
      contents: [
        await this.contentRepository.findOne({
          where: { purpose: "greeting" },
        }),
      ],
    });

    return this.notificationRepository.save(notification);
  }

  async getFollowingTeams(userId: number) {
    const userWithTeams = await this.repository.findOne({
      where: { id: userId },
      relations: [
        "followingTeams",
        "followingTeams.logo",
        "followingTeams.teamImage",
        "followingTeams.country",
      ],
    });

    return userWithTeams.followingTeams;
  }

  findAll() {
    return this.repository.find({
      select: ["id", "name", "surname", "email", "city", "country"],
    });
  }

  updateImage(id: number, imageId: number) {
    return this.repository.update(id, { image: { id: imageId } });
  }

  getRunnerFollowers(id: number) {
    return this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.followingRunners", "followingRunners")
      .where("followingRunners.id = :id", { id })
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("user.country", "country")
      .leftJoinAndSelect("user.runner", "runner")
      .leftJoinAndSelect("user.manager", "manager")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamAsRunner")
      .getMany();
  }

  async findById(id: number, authId?: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        "image",
        "country",
        "runner",
        "roles",
        "roles.role",
        "runner.personalBests",
        "runner.results",
        "runner.club",
        "runner.teamsAsRunner",
        "runner.teamsAsRunner.logo",
        "runner.teamsAsRunner.teamImage",
        "runner.teamsAsRunner.country",
        "runner.teamsAsRunner.coach",
        "runner.teamsAsRunner.personalBest",
        "runner.followers",
        "manager",
        "manager.club",
        "spectator",
        "spectator.favoriteClubs",
        "coach.teams.logo",
        "coach",
        "coach.teams.teamImage",
      ],
    });

    let isFollowing;

    if (authId) {
      isFollowing = user.runner?.followers?.some(
        (follower) => follower.id === +authId,
      );
    } else {
      isFollowing = null;
    }

    return user.runner
      ? { ...user, runner: { ...user.runner, isFollowing } }
      : user;
  }

  async findByCond(cond: LoginUserDto | { id: number }) {
    const query = this.repository
      .createQueryBuilder("user")
      .where({ ...cond })
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("user.roles", "roles")
      .leftJoinAndSelect("roles.role", "role");

    const userPreview = await query.getOne();

    if (userPreview.roles.find((r) => r.role.name === "runner")) {
      query.leftJoinAndSelect("user.runner", "runner");
      query.leftJoinAndSelect("runner.club", "club");
    } else if (userPreview.roles.find((r) => r.role.name === "manager")) {
      query.leftJoinAndSelect("user.manager", "manager");
      query.leftJoinAndSelect("manager.club", "club");
    }

    const user = await query.getOne();

    if (user) {
      return user;
    }
    return null;
  }

  async count() {
    const count = await this.repository.count();
    return { "Total users": count };
  }

  update(id: number, dto: User) {
    return this.repository.update(id, { ...dto });
  }

  async updateProfileData(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });

    let newCountry: Country;
    if (dto.country) {
      const countryIfExist = await this.countryService.returnIfExist({
        name: dto.country,
      });
      if (countryIfExist) {
        newCountry = countryIfExist;
      } else {
        newCountry = await this.countryService.create(dto.country);
      }
    }

    user.city = dto.city || user.city;
    user.country = newCountry || user.country;
    user.name = dto.name || user.name;
    user.image = dto.image || user.image;
    user.surname = dto.surname || user.surname;

    return this.repository.save(user);
  }

  async changePassword(
    id: number,
    dto: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) {
    if (dto.newPassword !== dto.confirmPassword || dto.newPassword.length < 6) {
      throw new ForbiddenException("Error Changing password");
    }
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      const isEqual = await bcrypt.compare(dto.oldPassword, user.password);
      if (isEqual) {
        const password = await bcrypt.hash(dto.newPassword, 10);
        return this.updatePassword(id, password);
      }
    }
    return null;
  }

  updatePassword(id: number, password: string) {
    return this.repository.update(id, { password });
  }
}
