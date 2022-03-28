import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class FindTaskDto {
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
