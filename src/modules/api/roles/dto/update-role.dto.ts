import { PartialType } from '@nestjs/mapped-types';
import { RoleEntity } from '../entities/role.entity';

export class UpdateRoleDto extends PartialType(RoleEntity) {
  name:string;
  sections?: string[];
}
