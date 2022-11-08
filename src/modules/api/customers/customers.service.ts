import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CorePagingOrder } from '../administrators/entities/core_paging_order.interface';
import { CustomerDatatable } from './customers.datatable';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
    private readonly filterService: CustomerDatatable
  ) { }

  async create(
    createCustomerDto: CreateCustomerDto,
    administrator: any
  ) : Promise<CustomerEntity> {
    const customerParams = { ...createCustomerDto, administrator: administrator.id };
    const customer = this.customerRepo.create(customerParams);
    return await this.customerRepo.save(customer);
  }

  findAll() : Promise<CustomerEntity[]> {
    return this.customerRepo.find({
      relations: {
        administrator: true
      }
    });
  }

  findOne(id: string) : Promise<CustomerEntity | null> {
    return this.customerRepo.findOne({
      where: {
        id: id
      },
      relations: {
        administrator: true
      }
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
    const current = await this.customerRepo.findOneBy({id: id});
    const customer = { ...current, ...updateCustomerDto };
    return await this.customerRepo.save(customer);
  }

  async remove(id: string) {
    await this.customerRepo.delete(id);
  }

  async paginate(options: IPaginationOptions, order: CorePagingOrder): Promise<Pagination<CustomerEntity>> {
    const queryBuilder = this.customerRepo.createQueryBuilder('cust');
    queryBuilder.leftJoinAndSelect("cust.administrator", "admin");

    if (order.order && order.field) {
      const orderTerm = order.order == 'ascend' ? 'ASC' : 'DESC';
      queryBuilder.orderBy(`cust.${order.field}`, orderTerm);
    } else {
      queryBuilder.orderBy(`cust.id`, 'ASC');
    }

    const filterQuery = this.filterService.build(order.filters);
    queryBuilder.where(filterQuery);
    return paginate<CustomerEntity>(queryBuilder, options);
  }
}
