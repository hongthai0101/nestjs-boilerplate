import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min
} from 'class-validator';

export class CreateCompanyDto {

  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'remark' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  remark: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate: Date

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  expectLeaveDate: Date
}
