import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { QueryFailedExceptionFilter } from 'src/utils/query_failed_exception.filter';
import { RequirePermissions } from 'src/utils/require_permissions.decorator';
import { AdministratorPermissions } from './administrators.permissions';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorSerializer } from './entities/administrator.serializer';

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
  findAll() {
    return this.administratorsService.findAll();
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
