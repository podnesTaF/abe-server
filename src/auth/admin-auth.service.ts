import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isEqual = await bcrypt.compare(password, admin.password);
      if (isEqual) {
        const { password, ...result } = admin;
        return result;
      }
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(admin: Admin) {
    const { password, ...adminData } = admin;
    return {
      ...adminData,
      token: this.generateJwtToken(adminData),
    };
  }

  async register(dto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const admin = await this.adminService.create({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      surname: dto.surname,
    });
    // Return the admin data along with a JWT token
    return {
      ...admin,
      token: this.generateJwtToken(admin),
    };
  }
}
