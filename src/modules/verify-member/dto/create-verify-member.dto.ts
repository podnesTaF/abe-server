import { IsObject, IsOptional, IsString } from "class-validator";
import { Member } from "src/modules/member/entities/member.entity";
import { User } from "src/modules/users/entities/user.entity";

export class CreateVerifyMemberDto {
  @IsObject()
  @IsOptional()
  member?: Member;

  @IsObject()
  @IsOptional()
  user?: User;

  @IsString()
  token: string;
}
