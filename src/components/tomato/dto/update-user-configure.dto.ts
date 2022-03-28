import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserConfigureDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isTaskNotify: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isMatterNotify: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sckey: string;
}
