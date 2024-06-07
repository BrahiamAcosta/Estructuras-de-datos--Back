import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { Repository } from 'typeorm';
import { CreateQrDto } from './dto/create-qr.dto';
import { ResourceService } from 'src/resource/resource.service';

@Injectable()
export class QrsService {
  
  constructor(@InjectRepository(Qr) private readonly qrRepository: Repository<Qr>,private readonly resourceService: ResourceService){
  }
  async create(createQrDto: CreateQrDto) {
    const {qrIdentifier, resourcesIds} = createQrDto
    const idAlreadyExists = await this.qrRepository.findOne({where:{qrIdentifier}})

    if(idAlreadyExists){
      throw new BadRequestException(
        'Ya existe un Código qr con este identificador',
      );
    }

    const resources = await this.resourceService.findByIds(resourcesIds)
    const newQr = new Qr()
    newQr.qrIdentifier = createQrDto.qrIdentifier
    newQr.resources = resources
    return this.qrRepository.save(newQr)
  }

  async findOneByIdentifier(qrIdentifier:string) : Promise<Qr | undefined>{
    const qr = await this.qrRepository.findOne({where:{qrIdentifier},relations:['resources']})
    
    if(qr){
      await this.qrRepository.update({qrIdentifier}, {scanCount:qr.scanCount + 1})
      return this.qrRepository.findOne({
        where: { qrIdentifier },
        relations: ['resources'],
    });
    }

    throw new BadRequestException(
      'Lo sentimos, este codigo no existe en nuestra base de datos',
    );
  }
}
