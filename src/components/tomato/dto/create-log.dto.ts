import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils';

export class CreateLogDto {
  
  @ApiProperty({ example: 'done content' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  doneContent: string;

  @ApiProperty({ example: 'undone content' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  undoneContent: string;

  @ApiProperty({ example: 'plan content' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  planContent: string;

  @ApiProperty({ example: 'summary content' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  summaryContent: string;

  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @IsNotEmpty()
  @Validate(IsExist, ['CompanyEntity', 'id'])
  company: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  logType: number
}
