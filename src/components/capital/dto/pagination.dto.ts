import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
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
  readonly typeName: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  readonly keyword: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly startDate: Date = new Date();

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly endDate: Date = new Date();
}
