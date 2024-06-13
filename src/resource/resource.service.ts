import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { ResourceTypeService } from 'src/resource-type/resource-type.service';

@Injectable()
export class ResourceService {
  constructor(@InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>, private readonly resourceTypeService:ResourceTypeService){}

  async create(createResourceDto: CreateResourceDto) {
    const resourceType = await this.resourceTypeService.findOne(createResourceDto.typeID)
    if(!resourceType){
      throw new BadRequestException('El tipo de recurso no existe')
    }
    const newResource = new Resource()
    newResource.resourceType = resourceType
    newResource.content = createResourceDto.content
    return this.resourceRepository.save(newResource)
  }

  async findAll(){
    return await this.resourceRepository.find({relations:['resourceType']})
  }

  async findByIds(resourcesIds: number[]){
    return await this.resourceRepository.findByIds(resourcesIds)
  }
}
