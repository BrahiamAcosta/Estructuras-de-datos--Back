import { Qr } from "src/qrs/entities/qr.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    link:string

    @Column({nullable:false})
    type:string

    @ManyToMany(()=>Qr, (qr) => qr.resources )
    qrs: Qr[]
}
