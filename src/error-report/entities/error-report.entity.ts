import { Qr } from "src/qrs/entities/qr.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ErrorReport {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    description:string

    @Column()
    date:Date

    @ManyToOne(()=>User)
    user:User

    @ManyToOne(()=>Qr, (qr)=>qr.errorReports)
    qr:Qr
}
