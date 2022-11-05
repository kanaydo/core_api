import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerSerializer } from './entities/customer.serializer';

@Controller('customers')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() request: Request
  ) {
    return this.customersService.create(createCustomerDto, request.user!);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('results', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('order') order: string,
    @Query('field') field: string,
    @Query('filters') filters: any
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.customersService.paginate({
      page,
      limit
    }, {
      order: order,
      field: field,
      filters: filters
    });
  }

  @Get(':id')
  @SerializeOptions({
    groups: [
      CustomerSerializer.DETAIL
    ] 
  })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
