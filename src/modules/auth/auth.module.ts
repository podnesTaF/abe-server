import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "src/modules/admin/admin.service";
import { Admin } from "src/modules/admin/entities/admin.entity";
import { CountryService } from "src/modules/country/country.service";
import { Country } from "src/modules/country/entity/country.entity";
import { ResetUser } from "src/modules/reset-user/entities/reset-user.entity";
import { ResetUserService } from "src/modules/reset-user/reset-user.service";
import { UserModule } from "../users/modules/user.module";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./guards/roles.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalAdminStrategy } from "./strategies/local-admin.strategy";
import { LocalStrategy } from "./strategies/local-user.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "ahmo-chat",
      signOptions: { expiresIn: "30d" },
    }),
    TypeOrmModule.forFeature([Country, Admin, ResetUser]),
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAdminStrategy,
    CountryService,
    AdminAuthService,
    AdminService,
    RolesGuard,
    ResetUserService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
