import { CacheModule, Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from '../roles/entities/role.entity';
import { AdministratorsFilterService } from './administrators.filter.service';

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
    AdministratorsFilterService
  ],
  exports: [
    AdministratorsService,
  ]
})
export class AdministratorsModule {}
