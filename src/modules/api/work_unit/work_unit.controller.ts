import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { WorkUnitService } from './work_unit.service';
import { CreateWorkUnitDto } from './dto/create-work_unit.dto';
import { UpdateWorkUnitDto } from './dto/update-work_unit.dto';

@Controller('work_units')
@UseInterceptors(ClassSerializerInterceptor)
export class WorkUnitController {
  constructor(private readonly workUnitService: WorkUnitService) {}

  @Post()
  create(@Body() createWorkUnitDto: CreateWorkUnitDto) {
    return this.workUnitService.create(createWorkUnitDto);
  }

  @Get()
  findAll() {
    return this.workUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workUnitService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkUnitDto: UpdateWorkUnitDto) {
    return this.workUnitService.update(id, updateWorkUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workUnitService.remove(id);
  }
}
