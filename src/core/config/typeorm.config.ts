import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as evnconfig } from "dotenv";
import { Best } from "src/modules/bests/entities/best.entity";
import { JoinRequest } from "src/modules/club-requests/entities/club-request.entity";
import { Club } from "src/modules/club/entities/club.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { Country } from "src/modules/country/entity/country.entity";
import { Event } from "src/modules/events/entities/event.entity";
import { FutureEvent } from "src/modules/events/entities/future-event.entity";
import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Hashtag } from "src/modules/hashtag/entities/hashtag.entity";
import { Location } from "src/modules/locations/entities/locations.entity";
import { Media } from "src/modules/media/entities/media.entity";
import { Member } from "src/modules/member/entities/member.entity";
import { News } from "src/modules/news/entities/news.entity";
import { NotificationEntity } from "src/modules/notification/entities/notification.entity";
import { PlayerEntity } from "src/modules/players/entities/player.entity";
import { PrizeCategory } from "src/modules/prizes/entities/prize-category";
import { PrizeEntity } from "src/modules/prizes/entities/prize.entity";
import { PushToken } from "src/modules/push-token/entities/push-token.entity";
import { RaceRegistration } from "src/modules/race-registration/entities/race-registration.entity";
import { Race } from "src/modules/race/entities/race.entity";
import { ResetUser } from "src/modules/reset-user/entities/reset-user.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { RunnerResult } from "src/modules/runner-results/entities/runner-results.entity";
import { Split } from "src/modules/splits/entities/splits.entity";
import { TeamRaceRunner } from "src/modules/team-race-runner/entities/team-race-runner.entity";
import { TeamRegistration } from "src/modules/team-registration/entities/team-registration.entity";
import { TeamResult } from "src/modules/team-results/entities/team-results.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { TimetableRow } from "src/modules/timetable/entities/timetable-row.entity";
import { Timetable } from "src/modules/timetable/entities/timetable.entity";
import { UserRole } from "src/modules/user-role/entities/user-role.entity";
import { Coach } from "src/modules/users/entities/coach.entity";
import { Manager } from "src/modules/users/entities/manager.entity";
import { Runner } from "src/modules/users/entities/runner.entity";
import { Spectator } from "src/modules/users/entities/spectator.entity";
import { User } from "src/modules/users/entities/user.entity";
import { VerifyMember } from "src/modules/verify-member/entities/verify-member.entity";
import { ViewerRegistration } from "src/modules/viewer-registrations/entities/viewer-registration.entity";
import { Admin } from "typeorm";

evnconfig();

const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.MYSQLHOST || "localhost",
  port: parseInt(process.env.MYSQLPORT, 10) || 3306,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [
    User,
    Event,
    Club,
    Location,
    Country,
    PlayerEntity,
    Team,
    Coach,
    Best,
    PrizeEntity,
    Media,
    ViewerRegistration,
    JoinRequest,
    Hashtag,
    Content,
    News,
    Race,
    TeamResult,
    Admin,
    RunnerResult,
    Split,
    ResetUser,
    Member,
    VerifyMember,
    Manager,
    Runner,
    Spectator,
    Feedback,
    FutureEvent,
    TeamRegistration,
    NotificationEntity,
    RaceRegistration,
    TeamRaceRunner,
    PushToken,
    PrizeCategory,
    UserRole,
    Timetable,
    TimetableRow,
    Role,
  ],
  synchronize: true,
};

export default config;
