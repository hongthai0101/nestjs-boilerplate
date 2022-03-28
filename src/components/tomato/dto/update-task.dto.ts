import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateTaskDto {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    rollback: Boolean;
}
