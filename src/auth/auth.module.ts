import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { UserModule } from '../user/user.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'ahmo-chat',
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([Country, Admin]),
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CountryService,
    AdminAuthService,
    AdminService,
  ],
})
export class AuthModule {}
