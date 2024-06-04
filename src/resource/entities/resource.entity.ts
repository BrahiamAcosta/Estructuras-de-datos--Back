import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    link:string

    @Column({nullable:false})
    type:string
}
