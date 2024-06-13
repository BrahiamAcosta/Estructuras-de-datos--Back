import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { Repository } from 'typeorm';
import { CreateQrDto } from './dto/create-qr.dto';
import { ResourceService } from 'src/resource/resource.service';
import { GetQrDto } from './dto/get-qr.dto';
import { UsersService } from 'src/users/users.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class QrsService {
  
  constructor(@InjectRepository(Qr) private readonly qrRepository: Repository<Qr>,
  private readonly resourceService: ResourceService,
  private readonly usersService:UsersService,
  private readonly tagsService:TagsService){
  }
  async create(createQrDto: CreateQrDto) {
    const {qrIdentifier, resourcesIds,tagsIds, primaryName} = createQrDto
    const idAlreadyExists = await this.qrRepository.findOne({where:{qrIdentifier}})

    if(idAlreadyExists){
      throw new BadRequestException(
        'Ya existe un Código qr con este identificador',
      );
    }

    const resources = await this.resourceService.findByIds(resourcesIds)
    const tags = await this.tagsService.findByIds(tagsIds)
    const newQr = new Qr()
    newQr.qrIdentifier = qrIdentifier
    newQr.resources = resources
    newQr.tags = tags
    newQr.primaryName = primaryName
    return this.qrRepository.save(newQr)
  }

  async findQr(getQrDto: GetQrDto) : Promise<Qr | undefined>{
    const {qrIdentifier,userName} = getQrDto
    const qr = await this.qrRepository.findOne({where:{qrIdentifier},relations:['resources','resources.resourceType','tags']})
    
    if(qr){
      const user = await this.usersService.findOneByUserName(userName)

      if (!user) {
        throw new BadRequestException('Ocurrio un error: Usuario invalido');
      }

      await this.qrRepository.update({qrIdentifier}, {scanCount:qr.scanCount + 1})

      await this.usersService.addQrToUser(user.id,qr)

      return qr
    }

    throw new BadRequestException(
      'Lo sentimos, este codigo no existe en nuestra base de datos',
    );
  }

  async addFavoriteQr(getQrDto:GetQrDto){
    const {qrIdentifier,userName} = getQrDto
    const qr = await this.qrRepository.findOne({where:{qrIdentifier},relations:['resources']})
    
    if(qr){
      const user = await this.usersService.findOneByUserName(userName)

      if (!user) {
        throw new BadRequestException('Ocurrio un error: Usuario invalido');
      }

      await this.usersService.addQrToFavorites(user.id,qr)

      return 'Qr agregado a favoritos'
    }

    throw new BadRequestException(
      'Lo sentimos, este codigo no existe en nuestra base de datos',
    );
  }

  async existsQr(qrIdentifier:string){
    return await this.qrRepository.findOne({where:{qrIdentifier}})
  }
}
