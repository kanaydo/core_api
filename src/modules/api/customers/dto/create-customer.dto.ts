import { PartialType } from "@nestjs/mapped-types";
import { CustomerEntity } from "../entities/customer.entity";

export class CreateCustomerDto extends PartialType(CustomerEntity) {
  firstName: string
  lastName?: string
  email: string
}
