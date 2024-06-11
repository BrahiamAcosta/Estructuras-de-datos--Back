import { Module } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QrsController } from './qrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { ResourceModule } from 'src/resource/resource.module';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports:[TypeOrmModule.forFeature([Qr]),ResourceModule,UsersModule,TagsModule],
  controllers: [QrsController],
  providers: [QrsService],
  exports:[QrsService]
})
export class QrsModule {}
