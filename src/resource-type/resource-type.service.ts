import { Injectable } from '@nestjs/common';
import { CreateResourceTypeDto } from './dto/create-resource-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceType } from './entities/resource-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceTypeService {

  constructor(@InjectRepository(ResourceType)private readonly resourcesTypeRepository:Repository<ResourceType>){}

  create(createResourceTypeDto: CreateResourceTypeDto) {
    return this.resourcesTypeRepository.save(createResourceTypeDto)
  }

  async findAll() {
    return await this.resourcesTypeRepository.find();
  }

  async findOne(id:number): Promise<ResourceType | undefined>{
    return this.resourcesTypeRepository.findOne({where:{id}})
  }
}
