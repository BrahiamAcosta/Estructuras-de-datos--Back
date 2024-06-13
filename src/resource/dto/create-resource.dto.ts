import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateResourceDto {
    @IsString()
    @MinLength(10)
    content:string

    @IsNumber()
    typeID:number
}
