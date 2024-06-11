import { Module } from '@nestjs/common';
import { ErrorReportService } from './error-report.service';
import { ErrorReportController } from './error-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorReport } from './entities/error-report.entity';
import { QrsModule } from 'src/qrs/qrs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([ErrorReport]),QrsModule,UsersModule],
  controllers: [ErrorReportController],
  providers: [ErrorReportService],
})
export class ErrorReportModule {}
