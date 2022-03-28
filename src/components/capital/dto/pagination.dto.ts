import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsUUID } from 'class-validator';
import { QueryBaseList } from 'src/utils';

export class FlowPaginationDto extends QueryBaseList {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly type: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly endDate: Date;
}
