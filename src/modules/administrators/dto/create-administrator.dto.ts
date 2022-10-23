import { PartialType } from "@nestjs/mapped-types"
import { AdministratorEntity } from "../entities/administrator.entity"

export class CreateAdministratorDto extends PartialType(AdministratorEntity) {
  username: string
  password: string
  roleList: number[]
}
