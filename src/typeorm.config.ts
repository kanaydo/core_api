import { DataSource } from 'typeorm';
import { Administrator } from './administrators/entities/administrator.entity';
 
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'jadiit',
  password: '',
  database: 'core_api_dev',
  entities: [
    Administrator
  ],
});
