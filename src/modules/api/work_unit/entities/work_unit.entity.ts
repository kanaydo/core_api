import CoreBaseEntity from "src/utils/core_base.entity";
import { Column, Entity } from "typeorm";

export enum WorkUnitStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'work_units'})
export class WorkUnitEntity extends CoreBaseEntity {

  @Column({type: 'text', unique: true})
  name: string

  @Column({type: 'text', nullable: true})
  description?: string

  @Column({
    type: 'enum',
    enum: WorkUnitStatus,
    default: WorkUnitStatus.ACTIVE,
  })
  status: WorkUnitStatus
}
