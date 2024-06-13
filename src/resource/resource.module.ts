import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceTypeModule } from 'src/resource-type/resource-type.module';

@Module({
  imports:[TypeOrmModule.forFeature([Resource]),ResourceTypeModule],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports:[ResourceService]
})
export class ResourceModule {}
