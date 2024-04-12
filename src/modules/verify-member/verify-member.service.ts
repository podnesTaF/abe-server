import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import sgMail from "@sendgrid/mail";
import { Repository } from "typeorm";
import { CreateVerifyMemberDto } from "./dto/create-verify-member.dto";
import { UpdateVerifyMemberDto } from "./dto/update-verify-member.dto";
import { VerifyMember } from "./entities/verify-member.entity";
import { getOtpEmailTemplate } from "./utils/getOtpEmailTemplate";

@Injectable()
export class VerifyMemberService {
  constructor(
    @InjectRepository(VerifyMember)
    private repository: Repository<VerifyMember>,
  ) {}

  create(dto: CreateVerifyMemberDto) {
    const expires = new Date().getTime() + 1000 * 60 * 60 * 24;

    return this.repository.save({
      ...dto,
      expires: new Date(expires),
      member: dto.member,
      user: dto.user,
    });
  }

  async completeVerification(dto: { email: string; otp: string }) {
    const isValid = await this.checkToken(dto.otp, dto.email);
    if (!isValid) {
      throw new BadRequestException("Invalid token");
    }

    await this.repository.delete({ token: dto.otp });
    return true;
  }

  generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  async sendVerificationEmail(dto: { email: string }) {
    const existing = await this.repository.findOne({
      where: { email: dto.email },
      order: { expires: "DESC" },
    });

    if (
      existing &&
      new Date().getTime() - existing.expires.getTime() + 1000 * 60 * 10 <
        1000 * 60
    ) {
      return { sent: false, message: "Email already sent" };
    }

    const otp = this.generateOtp();

    await this.repository.save({
      email: dto.email,
      token: otp,
      expires: new Date(new Date().getTime() + 1000 * 60 * 10),
    });

    const msg = {
      to: dto.email,
      from: {
        email: "it.podnes@gmail.com",
        name: "Ace Battle Mile",
      },
      subject: "Your OTP | Ace Battle Mile",
      html: getOtpEmailTemplate({
        otp: otp,
      }),
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log("error sending email", error.message);
    }

    return { sent: true, message: "Email sent" };
  }

  async checkToken(token: string, email?: string) {
    let verification: VerifyMember | undefined;

    if (email) {
      verification = await this.repository.findOne({
        where: { token, email },
      });
    } else {
      verification = await this.repository.findOne({
        where: { token },
      });
    }

    if (!verification) return false;

    const now = new Date().getTime();

    if (now > verification.expires.getTime()) {
      return false;
    }

    return true;
  }

  async getMember(token: string) {
    const verification = await this.repository.findOne({
      where: { token },
      relations: ["member"],
    });

    if (!verification) return null;

    return verification.member;
  }

  async getUser(token: string) {
    const verification = await this.repository.findOne({
      where: { token },
      relations: ["user"],
    });

    if (!verification) return null;

    return verification.user;
  }

  async delete(token: string) {
    return this.repository.delete({ token });
  }

  findAll() {
    return `This action returns all verifyMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verifyMember`;
  }

  update(id: number, updateVerifyMemberDto: UpdateVerifyMemberDto) {
    return `This action updates a #${id} verifyMember`;
  }
}
