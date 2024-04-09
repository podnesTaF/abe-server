import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { StripeService } from "src/stripe/stripe.service";
import { CompleteVerificationDto } from "../dtos/complete-verification.dto";
import { CreateUserDto, RetryDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserService } from "../services/user.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly stripeService: StripeService,
  ) {}

  @Post("/register")
  async register(@Body() body: CreateUserDto | RetryDto) {
    const user = await this.userService.create(body as CreateUserDto);
    let response: {
      message: string;
      checkoutUrl?: string;
    } = {
      message: "User created successfully.",
    };

    const pendingRolesIds = user.roles
      .filter((r) => r.role?.stripe_price_id)
      .map((r) => r.role.id);

    if (pendingRolesIds.length > 0) {
      const url = await this.stripeService.createCheckoutSession(
        user.id,
        pendingRolesIds,
      );

      response.checkoutUrl = url;
      response.message = "User created. Redirecting to payment...";

      return response;
    }
  }

  @Post("/cancel-registration")
  async cancelRegistration(@Body() body: { sessionId: string }) {
    const user = await this.stripeService.getUserFromSession(body.sessionId);
    return this.userService.cancelRegistration(user);
  }

  @Post("/verify")
  verifyMember(
    @Body()
    dto: CompleteVerificationDto,
  ) {
    return this.userService.completeVerification(dto);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get("/exists/:email")
  checkEmail(@Param("email") email: string) {
    return this.userService.isDuplicate(email);
  }

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    return this.userService.findByCond({ id: +req.user.id });
  }

  @Get("/followers")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("runner")
  getFollowers(@Request() req: any) {
    return this.userService.getRunnerFollowers(+req.user.id);
  }

  @Get("/following-teams")
  @UseGuards(JwtAuthGuard)
  geFollowingTeams(@Request() req: any) {
    return this.userService.getFollowingTeams(req.user.id);
  }

  @Get(":id")
  getUserProfile(@Param("id") id: number, @Query() query: { authId: string }) {
    return this.userService.findById(+id, query.authId);
  }

  @Patch("/image")
  @UseGuards(JwtAuthGuard)
  updateImage(@Request() req, @Body() body: { imageId: number }) {
    return this.userService.updateImage(req.user.id, body.imageId);
  }

  @Patch("/password")
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Request() req,
    @Body()
    body: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) {
    return this.userService.changePassword(req.user.id, body);
  }

  @Patch("/profile-data")
  @UseGuards(JwtAuthGuard)
  updateProfileData(@Request() req, @Body() body: UpdateUserDto) {
    return this.userService.updateProfileData(req.user.id, body);
  }

  @Get("count")
  count() {
    return this.userService.count();
  }
}
