import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerEntity } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDatatable } from './customers.datatable';
import { UniqueConstraint } from 'src/utils/validators/unique.validator';
import { DataSource } from 'typeorm';

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
export class CustomersModule {
  // constructor(private dataSource: DataSource) {}
}
