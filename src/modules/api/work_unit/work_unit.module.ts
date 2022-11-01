import { Module } from '@nestjs/common';
import { WorkUnitService } from './work_unit.service';
import { WorkUnitController } from './work_unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkUnitEntity } from './entities/work_unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkUnitEntity
    ]),
  ],
  controllers: [WorkUnitController],
  providers: [WorkUnitService]
})
export class WorkUnitModule {}
