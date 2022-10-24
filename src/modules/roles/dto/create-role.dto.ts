import { PartialType } from "@nestjs/mapped-types";
import { RoleEntity } from "../entities/role.entity";

export class CreateRoleDto extends PartialType(RoleEntity) {
  name:string;
  description?:string;
  sections: string[];
}
