import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) : Promise<CustomerEntity> {
    const customer = this.customerRepo.create(createCustomerDto);
    return await this.customerRepo.save(customer);
  }

  findAll() : Promise<CustomerEntity[]> {
    return this.customerRepo.find();
  }

  findOne(id: string) : Promise<CustomerEntity | null> {
    return this.customerRepo.findOneByOrFail({id: id});
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
    const current = await this.customerRepo.findOneBy({id: id});
    const customer = { ...current, ...updateCustomerDto };
    return await this.customerRepo.save(customer);
  }

  async remove(id: string) {
    await this.customerRepo.delete(id);
  }
}
