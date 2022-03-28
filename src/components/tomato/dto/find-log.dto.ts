import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsUUID } from 'class-validator';
import { QueryBaseList } from 'src/utils';

export class FindLogDto extends PartialType(QueryBaseList) {
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

    @ApiProperty({
      required: false,
    })
    @IsOptional()
    @IsUUID()
    readonly company: string;

    @ApiProperty({
      required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly logType: number;
}
