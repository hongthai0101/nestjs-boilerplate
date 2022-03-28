import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateTodoListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum([1, 2])
    status: number;
}
