import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministratorsModule } from './administrators/administrators.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './administrators/entities/administrator.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    AdministratorsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jadiit',
      password: '',
      database: 'core_api_dev',
      entities: [
        Administrator
      ],
      migrations: [],
      autoLoadEntities: true,
      logging: ["query", "error"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
