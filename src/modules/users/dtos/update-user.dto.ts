import { PartialType } from "@nestjs/mapped-types";
import { Media } from "src/modules/media/entities/media.entity";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  image?: Media;
}
