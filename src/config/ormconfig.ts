import * as dotenv from 'dotenv';
import { cwd } from 'process';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'jadiit',
  password: '',
  database: 'core_api_dev',
  entities: [cwd() + '/src/**/*.entity.ts'],
  migrations: [cwd() + '/src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  dropSchema: false,
});