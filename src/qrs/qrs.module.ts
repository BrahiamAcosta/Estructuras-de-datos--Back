import { Module } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QrsController } from './qrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Qr])],
  controllers: [QrsController],
  providers: [QrsService],
})
export class QrsModule {}
