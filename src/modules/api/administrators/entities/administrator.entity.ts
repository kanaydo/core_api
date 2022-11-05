import { Exclude, Expose } from 'class-transformer';
import CoreBaseEntity from 'src/utils/core_base.entity';
import { Column, Entity, OneToMany } from "typeorm";
import { CustomerEntity } from '../../customers/entities/customer.entity';
import { AdministratorSerializer } from './administrator.serializer';

export enum AdministratorStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity({name: 'administrators'})
export class AdministratorEntity extends CoreBaseEntity {
  @Column({type: 'text', unique: true})
  username: string;

  @Exclude()
  @Column({type: 'text'})
  passwordDigest: string;

  @Expose({groups: [AdministratorSerializer.DETAIL]})
  @Column("simple-array", { nullable: true })
  roleList: string[];

  @Expose({groups: [AdministratorSerializer.DETAIL, AdministratorSerializer.INDEX]})
  @Column({
    type: 'enum',
    enum: AdministratorStatus,
    default: AdministratorStatus.ACTIVE,
  })
  status: AdministratorStatus;

  @Expose({groups: [AdministratorSerializer.DETAIL]})
  updatedAt: Date;

  @Expose({groups: [AdministratorSerializer.DETAIL]})
  createdAt: Date;

  @OneToMany(() => CustomerEntity, (cust) => cust.administrator)
  customers: CustomerEntity[];

}
