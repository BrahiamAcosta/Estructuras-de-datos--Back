import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Qr } from 'src/qrs/entities/qr.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByUserName(userName: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ userName });
  }

  async getUserQrs(userName:string){
    return this.userRepository.findOne({where:{userName}, relations:['qrs','qrs.resources'], select:['id','userName']})
  }
  async getUserFavoriteQrs(userName:string){
    return await this.userRepository.findOne({where:{userName}, relations:['favoriteQrs','favoriteQrs.resources'], select:['id','userName']})
  }

  async addQrToUser(id:number,qr:Qr){
    const user = await this.userRepository.findOne({where:{id}, relations:['qrs']})
    if(!user){
      throw new NotFoundException('Ocurrió un error: usuario invalido')
    }

    if (!user.qrs.some(existingQr => existingQr.id === qr.id)) {
      // Agregar el QR a la lista de qrs del usuario
      user.qrs.push(qr);

      // Guardar el usuario actualizado
      await this.userRepository.save(user);
    }

    return 'Qr agregado a escaneados'
  }

  async addQrToFavorites(id:number,qr:Qr){
    const user = await this.userRepository.findOne({where:{id}, relations:['favoriteQrs']})
    if(!user){
      throw new NotFoundException('Ocurrió un error: usuario invalido')
    }

    if (!user.favoriteQrs.some(existingQr => existingQr.id === qr.id)) {
      // Agregar el QR a la lista de qrs del usuario
      user.favoriteQrs.push(qr);
      // Guardar el usuario actualizado
      await this.userRepository.save(user);
    }

    return 'Qr agregado a favoritos'
  }
}
