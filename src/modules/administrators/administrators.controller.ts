import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequirePermissions } from 'src/utils/require_permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdministratorPermissions } from './administrators.permissions';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('administrators')
@UseGuards(JwtAuthGuard)
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Post()
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_CREATE)
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorsService.create(createAdministratorDto);
  }

  @Get()
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_INDEX)
  findAll() {
    return this.administratorsService.findAll();
  }

  @Get(':id')
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_SHOW)
  findOne(@Param('id') id: string) {
    return this.administratorsService.findOne(+id);
  }

  @Patch(':id')
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_UPDATE)
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorsService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  @RequirePermissions(AdministratorPermissions.ADMINISTRATOR_DESTROY)
  remove(@Param('id') id: string) {
    return this.administratorsService.remove(+id);
  }
}
