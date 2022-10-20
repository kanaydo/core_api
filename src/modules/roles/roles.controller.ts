import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryFailedExceptionFilter } from 'src/utils/query_failed_exception.filter';
import { availableSections } from './data/sections/sections';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolePermissions } from './roles.permissions';
import { RequirePermissions } from 'src/utils/require_permissions.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseFilters(QueryFailedExceptionFilter)
  // @RequirePermissions(RolePermissions.ROLE_CREATE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('new')
  new() {
    return availableSections;
  }

  @Get()
  // @RequirePermissions(RolePermissions.ROLE_INDEX)
  findAll(@Req() request: Request) {
    // console.log(request);
    console.log(request.user);
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseFilters(QueryFailedExceptionFilter)
  // @RequirePermissions(RolePermissions.ROLE_SHOW)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(QueryFailedExceptionFilter)
  // @RequirePermissions(RolePermissions.ROLE_UPDATE)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  // @RequirePermissions(RolePermissions.ROLE_DESTROY)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
