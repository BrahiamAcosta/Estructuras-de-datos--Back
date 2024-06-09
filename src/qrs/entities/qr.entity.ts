import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resource } from "src/resource/entities/resource.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Qr {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ unique: true, nullable: false })
    qrIdentifier:string

    @Column({default:0})
    scanCount:number

    @ManyToMany(()=> Resource, (resource)=>resource.qrs)
    @JoinTable({
        name:'qrs_resources',
        joinColumn:{
            name:'qr_id'
        },
        inverseJoinColumn:{
            name:'resource_id'
        }
    })
    resources: Resource[]

    @ManyToMany(()=>User,(user)=>user.qrs)
    users: User[]
}
