import { IsObject, IsOptional, IsString } from "class-validator";
import { Media } from "src/modules/media/entities/media.entity";

export class CreateContentDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsObject()
  @IsOptional()
  media: Media;

  @IsString()
  @IsOptional()
  purpose: string;
}
