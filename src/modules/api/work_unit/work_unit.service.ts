import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkUnitDto } from './dto/create-work_unit.dto';
import { UpdateWorkUnitDto } from './dto/update-work_unit.dto';
import { WorkUnitEntity } from './entities/work_unit.entity';

@Injectable()
export class WorkUnitService {
  constructor(
    @InjectRepository(WorkUnitEntity) private workUnitRepo: Repository<WorkUnitEntity>,
  ) {}

  async create(createWorkUnitDto: CreateWorkUnitDto) : Promise<WorkUnitEntity> {
    const workUnit = this.workUnitRepo.create(createWorkUnitDto);
    await this.workUnitRepo.save(workUnit);
    return workUnit;
  }

  findAll() : Promise<WorkUnitEntity[]> {
    return this.workUnitRepo.find();
  }

  findOne(id: string) : Promise<WorkUnitEntity | null> {
    return this.workUnitRepo.findOneByOrFail({id: id});
  }

  async update(id: string, updateWorkUnitDto: UpdateWorkUnitDto) {
    const current = await this.workUnitRepo.findOneBy({id: id});
    const workUnit = { ...current, ...updateWorkUnitDto };
    await this.workUnitRepo.save(workUnit);
    return workUnit;
  }

  async remove(id: string) : Promise<void> {
    await this.workUnitRepo.delete(id);
  }
}
