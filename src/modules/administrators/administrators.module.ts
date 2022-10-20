import { CacheModule, Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Administrator,
      Role
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
