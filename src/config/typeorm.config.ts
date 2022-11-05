
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { AdministratorSubscriber } from 'src/modules/administrators/entities/administrator.subscriber';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jadiit',
      password: '',
      database: 'core_api_dev',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      subscribers: [
        // AdministratorSubscriber
      ],
      synchronize: false,
      logging: true,
    };
  },
  // dataSourceFactory: async (options) => {
  //   const dataSource = await new DataSource(options!).initialize();
  //   return dataSource;
  // },
};