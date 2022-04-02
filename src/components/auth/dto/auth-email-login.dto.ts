import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Validate, ValidateIf } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsExist, ['UserEntity'])
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsBoolean()
  @ValidateIf((e) => e.rememberMe !== '')
  readonly rememberMe?: boolean;
}
