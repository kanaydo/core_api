import { Expose, Transform } from "class-transformer";
import { format } from "date-fns";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkUnitSerializer } from "./work_unit.serializer";

export enum WorkUnitStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'work_units'})
export class WorkUnitEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'text', unique: true, name: 'name'})
  name: string

  @Column({type: 'text', name: 'description', nullable: true})
  description?: string

  @Column({
    type: 'enum',
    enum: WorkUnitStatus,
    default: WorkUnitStatus.ACTIVE,
  })
  status: WorkUnitStatus

  @Transform(({ value }) => format(value, 'dd/MM/yyyy HH:MM:SS'))
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date

  @Expose({groups: [WorkUnitSerializer.DETAIL]})
  @Transform(({ value }) => format(value, 'dd/MM/yyyy HH:MM:SS'))
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date
}
