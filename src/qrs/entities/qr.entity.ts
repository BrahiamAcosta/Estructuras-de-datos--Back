import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Qr {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ unique: true, nullable: false })
    qrIdentifier:string

    @Column({default:0})
    scanCount:number
}
