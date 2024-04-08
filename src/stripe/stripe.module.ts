import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import Joi from "joi";
import { Role } from "src/role/entities/role.entity";
import { UserRole } from "src/user-role/entities/user-role.entity";
import { User } from "src/users/entities/user.entity";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_PUBLIC_KEY: Joi.string().required(),
        STRIPE_WEBHOOK_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([User, Role, UserRole]),
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}

