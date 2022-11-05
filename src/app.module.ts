import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AppLoggerMiddleware } from './logger.middleware';
import { ApiModule } from './modules/api/api.module';
import { UniqueConstraint } from './utils/validators/unique.validator';


@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CacheModule.register({
      host: 'localhost',
      port: 6379,
      ttl: 0,
      isGlobal: true
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UniqueConstraint,
  ],
  exports: [
    CacheModule
  ]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
