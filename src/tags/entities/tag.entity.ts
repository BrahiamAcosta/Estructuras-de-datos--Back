import { Qr } from "src/qrs/entities/qr.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false, unique:true})
    name:string

    @ManyToMany(()=>Qr, (qr)=>qr.tags)
    qrs:Qr[]
}
