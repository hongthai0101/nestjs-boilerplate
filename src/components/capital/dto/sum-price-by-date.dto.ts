import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsOptional } from 'class-validator';
import moment from 'moment';

export class SumPriceByDateDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsDateString()
  readonly startDate: string = moment().startOf('hour').subtract(7, 'd').format('YYYY-MM-DD');

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsDateString()
  readonly endDate: string = moment().format('YYYY-MM-DD')
}
