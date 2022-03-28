import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateMemorandumDto {
  
  @ApiProperty({ example: 'done content' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'markdown' })
  @IsOptional()
  @IsString()
  markdown: string;
}
