import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';

export class CreateCapitaFlowDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @IsNotEmpty()
  @Validate(IsExist, ['CapitalFlowTypeEntity', 'id'])
  type: string;

  @ApiProperty({ example: 'remark' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  remark: string;
}
