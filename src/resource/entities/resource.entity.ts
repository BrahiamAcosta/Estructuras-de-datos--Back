import { Qr } from "src/qrs/entities/qr.entity";
import { ResourceType } from "src/resource-type/entities/resource-type.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    content:string


    @ManyToMany(()=>Qr, (qr) => qr.resources )
    qrs: Qr[]

    @ManyToOne(()=>ResourceType, (resourceType)=>resourceType.resources)
    resourceType:ResourceType
}
