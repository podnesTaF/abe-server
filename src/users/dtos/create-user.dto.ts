import {
  IsArray,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Media } from "src/media/entities/media.entity";
import { CreateRunnerDto } from "./create-runner.dto";
import { CreateSpectatorDto } from "./create-spectator.dto";

export class CreateUserDto {
  @Length(2)
  name: string;

  @Length(2)
  surname: string;

  @IsEmail(undefined, { message: "Wrong email" })
  email: string;

  @IsObject()
  @IsOptional()
  image?: Media;

  @IsObject()
  @IsOptional()
  avatar?: Media;

  @IsString()
  @IsOptional()
  ageRange: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsArray()
  roleIds: number[];

  @IsString()
  @IsOptional()
  interest: string;

  @IsObject()
  @IsOptional()
  runner: CreateRunnerDto;

  @IsObject()
  @IsOptional()
  spectator: CreateSpectatorDto;
}
