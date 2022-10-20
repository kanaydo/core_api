import { PartialType } from '@nestjs/mapped-types';
import { Administrator } from '../entities/administrator.entity';

export class UpdateAdministratorDto extends PartialType(Administrator) {
  username?: string
  password?: string
  roleList?: number[]
}
