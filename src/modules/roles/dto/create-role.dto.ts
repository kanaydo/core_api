import { PartialType } from "@nestjs/mapped-types";
import { Role } from "../entities/role.entity";

export class CreateRoleDto extends PartialType(Role) {
  name:string;
  sections: string[];
}
