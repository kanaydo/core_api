import { PartialType } from "@nestjs/mapped-types";
import { Unique } from "src/utils/validators/unique.validator";
import { CustomerEntity } from "../entities/customer.entity";

export class CreateCustomerDto extends PartialType(CustomerEntity) {
  firstName: string;
  lastName?: string;
  @Unique(CustomerEntity, 'email')
  email: string;
  @Unique(CustomerEntity, 'phone')
  phone: string;
  address: string;
}
