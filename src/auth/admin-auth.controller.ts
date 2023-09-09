import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AdminAuthService } from './admin-auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.adminAuthService.login(req.user);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    // You need to adapt this to the admin registration logic using adminService
    return this.adminAuthService.register(dto);
  }
}
