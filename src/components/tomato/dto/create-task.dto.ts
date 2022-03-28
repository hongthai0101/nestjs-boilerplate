import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTaskDto {
  
  @ApiProperty()
  @IsDateString()
  date: Date = new Date();

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  count: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  images: Array<string>;
}
