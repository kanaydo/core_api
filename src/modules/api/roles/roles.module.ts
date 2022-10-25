import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleFilter } from './roles.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleFilter
  ],
  exports: [
    RolesService,
    RoleFilter
  ]
})
export class RolesModule {}
