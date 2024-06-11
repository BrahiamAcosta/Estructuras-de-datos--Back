import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {

  constructor(@InjectRepository(Tag)private readonly tagRepository:Repository<Tag>){}
  create(createTagDto: CreateTagDto) {
    return this.tagRepository.save(createTagDto)
  }

  async findAll() {
    return await this.tagRepository.find()
  }

  async findByIds(resourcesIds: number[]){
    return await this.tagRepository.findByIds(resourcesIds)
  }
}
