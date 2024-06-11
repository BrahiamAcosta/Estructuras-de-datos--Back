import { Transform } from 'class-transformer'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, MinLength } from 'class-validator'

export class CreateQrDto{
    @Transform(({value})=>(value.trim()))
    @IsString()
    @MinLength(3)
    qrIdentifier:string

    @IsArray()
    @ArrayMinSize(0)
    @ArrayMaxSize(3)
    resourcesIds:number[]

    @IsArray()
    @ArrayMinSize(0)
    tagsIds:number[]

    @Transform(({value})=>(value.trim()))
    @IsString()
    @MinLength(1)
    primaryName:string
}