import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { Repository } from 'typeorm';
import { CreateQrDto } from './dto/create-qr.dto';

@Injectable()
export class QrsService {
  
  constructor(@InjectRepository(Qr) private readonly qrRepository: Repository<Qr>){
  }
  create(createQrDto: CreateQrDto) {
    return this.qrRepository.save(createQrDto)
  }

  async findOneByIdentifier(qrIdentifier:string) : Promise<Qr | undefined>{
    const qr = await this.qrRepository.findOneBy({qrIdentifier})
    
    if(qr){
      await this.qrRepository.update({qrIdentifier}, {scanCount:qr.scanCount + 1})
    }

    return this.qrRepository.findOneBy({qrIdentifier})
  }
}
