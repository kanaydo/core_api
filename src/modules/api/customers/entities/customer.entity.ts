import { Expose, instanceToPlain, Transform, Type } from "class-transformer";
import { Validate } from "class-validator";
import CoreBaseEntity from "src/utils/core_base.entity";
import { Unique } from "src/utils/validators/unique.validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AdministratorEntity } from "../../administrators/entities/administrator.entity";
import { CustomerSerializer } from "./customer.serializer";

export enum CustomerStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum CustomerGender {
  MALE = "male",
  FEMALE = "female"
}

@Entity({name: 'customers'})
export class CustomerEntity extends CoreBaseEntity {
  @Column({type: 'text'})
  firstName: string

  @Column({type: 'text'})
  lastName: string

  @Column({type: 'text', unique: true})
  email: string

  @Expose({groups: [CustomerSerializer.DETAIL]})
  updatedAt: Date

  @Expose({groups: [CustomerSerializer.DETAIL]})
  createdAt: Date

  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE,
  })
  status: CustomerStatus

  @Column({
    type: 'enum',
    enum: CustomerGender,
    nullable: true
  })
  gender?: CustomerGender

  @Column({type: 'text', unique: true})
  phone: string

  @Column({type: 'text'})
  address: string

  // @OneToOne(() => AdministratorEntity)
  @ManyToOne(() => AdministratorEntity, (adm) => adm.customers)
  // @JoinColumn()
  administrator: AdministratorEntity
}
