import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, UseInterceptors, ClassSerializerInterceptor, SerializeOptions, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { QueryFailedExceptionFilter } from 'src/utils/query_failed_exception.filter';
import { RequirePermissions } from 'src/utils/require_permissions.decorator';
import { AdministratorPermissions } from './administrators.permissions';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorSerializer } from './entities/administrator.serializer';
import { CorePagingOrder } from './entities/core_paging_order.interface';

@Controller('administrators')
@UseInterceptors(ClassSerializerInterceptor)
export class AdministratorsController {
  constructor(
    private readonly administratorsService: AdministratorsService
  ) {}

  @Post()
  @UseFilters(QueryFailedExceptionFilter)
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_CREATE)
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorsService.create(createAdministratorDto);
  }

  @Get()
  @UseFilters(QueryFailedExceptionFilter)
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_INDEX)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('results', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('order') order: string,
    @Query('field') field: string
  ) {
    console.log(order, field);
    limit = limit > 100 ? 100 : limit;
    return this.administratorsService.paginate({
      page,
      limit
    }, {
      order: order,
      field: field
    });
  }

  @Get(':id')
  @UseFilters(QueryFailedExceptionFilter)
  @SerializeOptions({ groups: [AdministratorSerializer.DETAIL] })
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_SHOW)
  findOne(@Param('id') id: string) {
    return this.administratorsService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(QueryFailedExceptionFilter)
  @SerializeOptions({ groups: [AdministratorSerializer.DETAIL] })
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_UPDATE)
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorsService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  @UseFilters(QueryFailedExceptionFilter)
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_DESTROY)
  remove(@Param('id') id: string) {
    return this.administratorsService.remove(+id);
  }
}

