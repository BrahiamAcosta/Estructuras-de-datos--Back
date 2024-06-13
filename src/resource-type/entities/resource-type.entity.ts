import { Resource } from "src/resource/entities/resource.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResourceType {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true, nullable:false})
    name:string

    @OneToMany(()=>Resource, (resource)=>resource.resourceType)
    resources:Resource[]
}
