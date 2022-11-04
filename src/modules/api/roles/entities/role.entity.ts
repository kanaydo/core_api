import { Expose } from "class-transformer";
import CoreBaseEntity from "src/utils/core_base.entity";
import { Column, Entity } from "typeorm";
import { RoleSerializer } from "./role.serializer";

export enum RoleStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'roles'})
export class RoleEntity extends CoreBaseEntity {
  @Column({ type: 'text', unique: true })
  name:string

  @Column({ type: 'text', nullable: true })
  description?:string

  @Expose({groups: [RoleSerializer.DETAIL]})
  @Column("simple-array", { name: 'sections' })
  sections: string[];

  @Column({
    type: 'enum',
    enum: RoleStatus,
    default: RoleStatus.ACTIVE,
  })
  status: RoleStatus
}
