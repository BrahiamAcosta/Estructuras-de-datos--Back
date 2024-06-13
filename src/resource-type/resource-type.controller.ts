import { Controller, Get, Post, Body} from '@nestjs/common';
import { ResourceTypeService } from './resource-type.service';
import { CreateResourceTypeDto } from './dto/create-resource-type.dto';

@Controller('resource-type')
export class ResourceTypeController {
  constructor(private readonly resourceTypeService: ResourceTypeService) {}

  @Post()
  create(@Body() createResourceTypeDto: CreateResourceTypeDto) {
    return this.resourceTypeService.create(createResourceTypeDto);
  }

  @Get()
  findAll() {
    return this.resourceTypeService.findAll();
  }
}
