import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength, Min } from 'class-validator';

export class CreateCapitaFlowTypeDto {
  @ApiProperty({ example: 'name' })
  @IsOptional()
  @MaxLength(20)
  name: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sortIndex: number;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  type: number;
}
