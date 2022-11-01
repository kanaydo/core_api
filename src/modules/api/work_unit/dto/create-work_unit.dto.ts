import { PartialType } from "@nestjs/mapped-types";
import { WorkUnitEntity } from "../entities/work_unit.entity";

export class CreateWorkUnitDto extends PartialType(WorkUnitEntity) {
  name: string;
  description?: string;
}
