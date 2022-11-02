import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleDatatable } from './roles.datatable';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleDatatable
  ],
  exports: [
    RolesService,
    RoleDatatable
  ]
})
export class RolesModule {}
