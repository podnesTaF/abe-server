import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { CreateContentDto } from "src/content/dto/create-content.dto";
import { CreateLocationDto } from "src/locations/dto/create-location.dto";
import { Media } from "src/media/entities/media.entity";
import { CreatePrizeCategoryDto } from "src/prizes/dto/create-prize-category.dto";

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  eventCode: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  contents: CreateContentDto[];

  @IsString()
  startDateTime: string;

  @IsString()
  endDate: string;

  @IsString()
  attendanceType: "free" | "paid";

  @IsObject()
  location: CreateLocationDto;

  @IsArray()
  @IsOptional()
  prizeCategories: CreatePrizeCategoryDto[];

  @IsString()
  @IsOptional()
  introImage?: Media;

  @IsString()
  @IsOptional()
  minorImage?: Media;
}
