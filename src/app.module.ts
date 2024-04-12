import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { resolve } from "path";
import config from "./core/config/typeorm.config";
import { AdminModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BestsModule } from "./modules/bests/bests.module";
import { ClubRequestsModule } from "./modules/club-requests/club-requests.module";
import { ClubModule } from "./modules/club/club.module";
import { ContentModule } from "./modules/content/content.module";
import { CountryModule } from "./modules/country/country.module";
import { EventsModule } from "./modules/events/events.module";
import { FutureEventsModule } from "./modules/events/future-events.module";
import { FeedbacksModule } from "./modules/feedbacks/feedbacks.module";
import { FileModule } from "./modules/file/file.module";
import { HashtagModule } from "./modules/hashtag/hashtag.module";
import { IntegrationModule } from "./modules/integration/integration.module";
import { LocationsModule } from "./modules/locations/locations.module";
import { MediaModule } from "./modules/media/media.module";
import { MemberModule } from "./modules/member/member.module";
import { NewsModule } from "./modules/news/news.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { PlayersModule } from "./modules/players/players.module";
import { PrizesModule } from "./modules/prizes/prizes.module";
import { PushTokenModule } from "./modules/push-token/push-token.module";
import { RaceRegistrationModule } from "./modules/race-registration/race-registration.module";
import { RaceModule } from "./modules/race/race.module";
import { ResetUserModule } from "./modules/reset-user/reset-user.module";
import { RoleModule } from "./modules/role/role.module";
import { RunnerResultsModule } from "./modules/runner-results/runner-results.module";
import { SplitsModule } from "./modules/splits/splits.module";
import { StripeModule } from "./modules/stripe/stripe.module";
import { TeamRaceRunnerModule } from "./modules/team-race-runner/team-race-runner.module";
import { TeamRegistrationModule } from "./modules/team-registration/team-registration.module";
import { TeamResultsModule } from "./modules/team-results/team-results.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { TimetableModule } from "./modules/timetable/timetable.module";
import { UserRoleModule } from "./modules/user-role/user-role.module";
import { CoachModule } from "./modules/users/modules/coach.module";
import { ManagerModule } from "./modules/users/modules/manager.module";
import { RunnerModule } from "./modules/users/modules/runner.module";
import { SpectatorModule } from "./modules/users/modules/spectator.module";
import { UserModule } from "./modules/users/modules/user.module";
import { VerifyMemberModule } from "./modules/verify-member/verify-member.module";
import { ViewerRegistrationsModule } from "./modules/viewer-registrations/viewer-registrations.module";

@Module({
  imports: [
    ConfigModule.forRoot(), // Import the ConfigModule to load environment variables
    TypeOrmModule.forRoot(config),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, "static"),
    }),
    UserModule,
    AuthModule,
    EventsModule,
    LocationsModule,
    TeamsModule,
    PlayersModule,
    BestsModule,
    PrizesModule,
    ClubModule,
    CountryModule,
    FileModule,
    MediaModule,
    NewsModule,
    HashtagModule,
    ContentModule,
    IntegrationModule,
    ClubRequestsModule,
    ViewerRegistrationsModule,
    RaceModule,
    TeamResultsModule,
    RunnerResultsModule,
    SplitsModule,
    AdminModule,
    ResetUserModule,
    MemberModule,
    VerifyMemberModule,
    ManagerModule,
    SpectatorModule,
    RunnerModule,
    CoachModule,
    FeedbacksModule,
    FutureEventsModule,
    NotificationModule,
    TeamRegistrationModule,
    RaceRegistrationModule,
    TeamRaceRunnerModule,
    PushTokenModule,
    RoleModule,
    UserRoleModule,
    StripeModule,
    TimetableModule,
  ],
})
export class AppModule {}
