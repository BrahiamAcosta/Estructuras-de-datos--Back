import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateResourceTypeDto {
    @Transform(({value})=>value.trim())
    @MinLength(4)
    @IsString()
    name:string
}
