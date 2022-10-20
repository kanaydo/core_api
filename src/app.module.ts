import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministratorsModule } from './modules/administrators/administrators.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdministratorsService } from './modules/administrators/administrators.service';
import { Administrator } from './modules/administrators/entities/administrator.entity';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CacheModule.register({
      // store: redisStore,
      // host: 'localhost',
      // port: 6379,
      isGlobal: true
    }),
    AdministratorsModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [
    CacheModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
