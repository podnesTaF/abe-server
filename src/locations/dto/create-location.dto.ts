import { IsObject, IsOptional, IsString } from "class-validator";
import { Media } from "src/media/entities/media.entity";

export class CreateLocationDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  zipCode: string;

  @IsString()
  address: string;

  @IsObject()
  @IsOptional()
  placeImage: Media;

  @IsString()
  @IsOptional()
  stadium: string;

  @IsString()
  @IsOptional()
  placeDescription: string;
}
