import { Transform } from "class-transformer"
import { IsString, MinLength } from "class-validator"

export class CreateErrorReportDto {
    @Transform(({value})=>(value.trim()))
    @IsString()
    @MinLength(3)
    qrIdentifier:string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    userName:string

    @Transform(({value})=>(value.trim()))
    @IsString()
    @MinLength(5)
    description:string
}
