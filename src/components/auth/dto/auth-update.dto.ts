import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { FileEntity } from '../../files/entities/file.entity';

export class AuthUpdateDto {

  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  oldPassword: string;
}
