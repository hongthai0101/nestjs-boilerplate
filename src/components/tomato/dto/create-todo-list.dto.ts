import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateTodoListDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  content: string;
}
