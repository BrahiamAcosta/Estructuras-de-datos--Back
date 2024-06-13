import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QrsModule } from './qrs/qrs.module';
import { ResourceModule } from './resource/resource.module';
import { ErrorReportModule } from './error-report/error-report.module';
import { TagsModule } from './tags/tags.module';
import { ResourceTypeModule } from './resource-type/resource-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    QrsModule,
    ResourceModule,
    ErrorReportModule,
    TagsModule,
    ResourceTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
