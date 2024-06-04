import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  constructor(@InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>){}

  create(createResourceDto: CreateResourceDto) {
    return this.resourceRepository.save(createResourceDto)
  }

  async findAll(){
    return await this.resourceRepository.find()
  }
}
