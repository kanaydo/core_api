import { PartialType } from "@nestjs/mapped-types"
import { Administrator } from "../entities/administrator.entity"

export class CreateAdministratorDto extends PartialType(Administrator) {
  username: string
  password: string
}
