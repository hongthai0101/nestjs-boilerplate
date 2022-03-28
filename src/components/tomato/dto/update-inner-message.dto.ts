import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
} from 'class-validator';

export class UpdateInnerMessageDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Boolean)
  hasRead: Boolean
}
