import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { RequirePermissions } from 'src/utils/require_permissions.decorator';
import { RolesService } from '../roles/roles.service';
import { Request } from 'express';
import { AdministratorPermissions } from './administrators.permissions';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorSerializer } from './entities/administrator.serializer';

@Controller('administrators')
@UseInterceptors(ClassSerializerInterceptor)
export class AdministratorsController {
  constructor(
    private readonly administratorsService: AdministratorsService,
    private readonly roleService: RolesService
  ) {

  }

  @Post()
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_CREATE)
  create(
    @Body() createAdministratorDto: CreateAdministratorDto
  ) {
    return this.administratorsService.create(createAdministratorDto);
  }

  @Get('new')
  new() {
    return this.roleService.findAll();
  }

  @Get()
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_INDEX)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('results', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('order') order: string,
    @Query('field') field: string,
    @Query('filters') filters: any
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.administratorsService.paginate({
      page,
      limit
    }, {
      order: order,
      field: field,
      filters: filters
    });
  }

  @Get(':id')
  @SerializeOptions({ groups: [AdministratorSerializer.DETAIL] })
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_SHOW)
  findOne(@Param('id') id: string) {
    return this.administratorsService.findOne(id);
  }

  @Patch(':id')
  @SerializeOptions({ groups: [AdministratorSerializer.DETAIL] })
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_UPDATE)
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorsService.update(id, updateAdministratorDto);
  }

  @Delete(':id')
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_DESTROY)
  remove(@Param('id') id: string) {
    return this.administratorsService.remove(id);
  }
}

