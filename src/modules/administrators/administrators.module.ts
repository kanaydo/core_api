import { CacheModule, Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from '../roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdministratorEntity,
      RoleEntity
    ]),
  ],
  controllers: [AdministratorsController],
  providers: [
    AdministratorsService,
  ],
  exports: [
    AdministratorsService,
  ]
})
export class AdministratorsModule {}
