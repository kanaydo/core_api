import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerEntity } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDatatable } from './customers.datatable';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity
    ]),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerDatatable
  ]
})
export class CustomersModule {}
