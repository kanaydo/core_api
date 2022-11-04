import { Exclude, Expose } from 'class-transformer';
import CoreBaseEntity from 'src/utils/core_base.entity';
import { Column, Entity } from "typeorm";
import { AdministratorSerializer } from './administrator.serializer';

export enum AdministratorStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'administrators'})
export class AdministratorEntity extends CoreBaseEntity {
  @Column({type: 'text', unique: true})
  username: string

  @Exclude()
  @Column({type: 'text'})
  passwordDigest: string

  @Expose({groups: [AdministratorSerializer.DETAIL]})
  @Column("simple-array", { nullable: true })
  roleList: string[];

  @Column({
    type: 'enum',
    enum: AdministratorStatus,
    default: AdministratorStatus.ACTIVE,
  })
  status: AdministratorStatus
}
