import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { QueryBaseList } from 'src/utils';

export class FindReminderDto extends PartialType(QueryBaseList) {

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsEnum([1,2])
  readonly type: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsDateString()
  readonly startDate: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsDateString()
  readonly endDate: Date;
}
