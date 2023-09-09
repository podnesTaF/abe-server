import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({ email });
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        const { password, ...result } = user;
        return { userType: 'user', ...result };
      }
    }

    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isEqual = await bcrypt.compare(password, admin.password);
      if (isEqual) {
        const { password, ...result } = admin;
        return { userType: 'admin', ...result };
      }
    }

    return null;
  }
}
