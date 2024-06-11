import { Qr } from 'src/qrs/entities/qr.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(()=>Qr,(qr)=>qr.users)
  @JoinTable(({
    name:'Scans',
    joinColumn:{
        name:'user_id'
    },
    inverseJoinColumn:{
        name:'qr_id'
    }
}))
  qrs:Qr[]

  @ManyToMany(()=>Qr, (qr)=> qr.favoriteUsers)
  @JoinTable(({
    name:'Favorites',
    joinColumn:{
      name:'user_id'
    },
    inverseJoinColumn:{
      name:'qr_id'
    }
  }))
  favoriteQrs:Qr[]
}
