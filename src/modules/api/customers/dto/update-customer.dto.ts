import { PartialType } from '@nestjs/mapped-types';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CustomerEntity) {
  firstName: string
  lastName?: string
  email: string
}
