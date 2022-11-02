import { PartialType } from '@nestjs/mapped-types';
import { CustomerEntity } from '../entities/customer.entity';

export class UpdateCustomerDto extends PartialType(CustomerEntity) {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
}
