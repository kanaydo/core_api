import { PartialType } from '@nestjs/mapped-types';
import { AdministratorEntity } from '../entities/administrator.entity';

export class UpdateAdministratorDto extends PartialType(AdministratorEntity) {
  username?: string
  password?: string
  roleList?: number[]
}
