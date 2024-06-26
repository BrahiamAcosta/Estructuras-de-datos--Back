import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resource } from "src/resource/entities/resource.entity";
import { User } from "src/users/entities/user.entity";
import { ErrorReport } from "src/error-report/entities/error-report.entity";
import { Tag } from "src/tags/entities/tag.entity";

@Entity()
export class Qr {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ unique: true, nullable: false })
    qrIdentifier:string

    @Column({default:0})
    scanCount:number

    @Column({nullable:false, default:'EcoScan Qr'})
    primaryName:string

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

    @ManyToMany(()=>User, (user)=>user.favoriteQrs)
    favoriteUsers:User[]

    @ManyToMany(()=>Tag, (tag)=>tag.qrs)
    @JoinTable({
        name:'qrs_tags',
        joinColumn:{
            name:'qr_id'
        },
        inverseJoinColumn:{
            name:'tag_id'
        }
    })
    tags:Tag[]

    @OneToMany(()=>ErrorReport, (errorReport)=>errorReport.qr)
    errorReports:ErrorReport[]
}
