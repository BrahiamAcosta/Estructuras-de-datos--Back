import { IsString, IsUrl, MinLength } from "class-validator";

export class CreateResourceDto {
    @IsUrl()
    @MinLength(10)
    link:string

    @IsString()
    type:string
}
