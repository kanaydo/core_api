import { Exclude, Expose, Transform } from 'class-transformer';
import { format } from 'date-fns'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AdministratorSerializer } from './administrator.serializer';

export enum AdministratorStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'administrators'})
export class AdministratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', unique: true, name: 'username'})
  username: string

  @Exclude()
  @Column({type: 'text', name: 'password_digest'})
  passwordDigest: string

  @Transform(({ value }) => format(value, 'dd/MM/yyyy HH:MM:SS'))
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date

  @Expose({groups: [AdministratorSerializer.DETAIL]})
  @Column("simple-array", { name: 'role_list', nullable: true })
  roleList: number[];

  @Column({
    type: 'enum',
    enum: AdministratorStatus,
    default: AdministratorStatus.ACTIVE,
  })
  role: AdministratorStatus
}
