import { Module } from '@nestjs/common';
import { ResourceTypeService } from './resource-type.service';
import { ResourceTypeController } from './resource-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceType } from './entities/resource-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ResourceType])],
  controllers: [ResourceTypeController],
  providers: [ResourceTypeService],
  exports:[ResourceTypeService]
})
export class ResourceTypeModule {}
