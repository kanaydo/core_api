import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { AdministratorsDatatable } from './administrators.datatable';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdministratorEntity,
      RoleEntity
    ]),
    RolesModule
  ],
  controllers: [AdministratorsController],
  providers: [
    AdministratorsService,
    AdministratorsDatatable
  ],
  exports: [
    AdministratorsService,
  ]
})
export class AdministratorsModule {}
