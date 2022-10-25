import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, SerializeOptions, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryFailedExceptionFilter } from 'src/utils/query_failed_exception.filter';
import { availableSections } from './data/sections/sections';
import { RolePermissions } from './roles.permissions';
import { RequirePermissions } from 'src/utils/require_permissions.decorator';
import { RoleSerializer } from './entities/role.serializer';

@Controller('roles')
@UseInterceptors(ClassSerializerInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseFilters(QueryFailedExceptionFilter)
  @RequirePermissions(RolePermissions.ROLE_CREATE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('new')
  new() {
    return availableSections;
  }

  @Get()
  @RequirePermissions(RolePermissions.ROLE_INDEX)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('results', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('order') order: string,
    @Query('field') field: string,
    @Query('filters') filters: any
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.rolesService.paginate({
      page,
      limit
    }, {
      order: order,
      field: field,
      filters: filters
    });
  }

  @Get(':id')
  @UseFilters(QueryFailedExceptionFilter)
  @SerializeOptions({ groups: [RoleSerializer.DETAIL] })
  @RequirePermissions(RolePermissions.ROLE_SHOW)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(QueryFailedExceptionFilter)
  @RequirePermissions(RolePermissions.ROLE_UPDATE)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    // console.log(updateRoleDto);
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions(RolePermissions.ROLE_DESTROY)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
