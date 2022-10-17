import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jadiit',
      password: '',
      database: 'core_api_dev',
      entities: [],
      autoLoadEntities: true,
      logging: ["query", "error"],
      synchronize: true,
    }),
  ],
})
class DatabaseModule {}
 
export default DatabaseModule;