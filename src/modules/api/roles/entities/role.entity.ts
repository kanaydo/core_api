import { Expose, Transform } from "class-transformer";
import { format } from "date-fns";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleSerializer } from "./role.serializer";

export enum RoleStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'roles'})
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string;

  @Column({ type: 'text', unique: true })
  name:string

  @Column({ type: 'text', nullable: true })
  description?:string

  @Transform(({ value }) => format(value, 'dd/MM/yyyy HH:MM:SS'))
  @CreateDateColumn({ name: 'created_at' })
  createdAt:Date

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
