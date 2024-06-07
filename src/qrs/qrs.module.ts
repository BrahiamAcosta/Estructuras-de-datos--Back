import { Module } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QrsController } from './qrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { ResourceModule } from 'src/resource/resource.module';

@Module({
  imports:[TypeOrmModule.forFeature([Qr]),ResourceModule],
  controllers: [QrsController],
  providers: [QrsService],
})
export class QrsModule {}
