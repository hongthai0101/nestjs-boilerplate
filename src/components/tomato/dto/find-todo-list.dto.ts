import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { QueryBaseList } from 'src/utils';

export class FindTodoListDto extends PartialType(QueryBaseList) {
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
