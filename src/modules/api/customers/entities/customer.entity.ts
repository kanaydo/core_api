import { Expose } from "class-transformer";
import CoreBaseEntity from "src/utils/core_base.entity";
import { Column, Entity, Unique } from "typeorm";
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
  @Column({type: 'text', default: null})
  firstName: string

  @Column({type: 'text', default: null})
  lastName: string

  @Column({type: 'text', unique: true, default: null})
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

  @Column({type: 'text', unique: true, default: null})
  phone: string

  @Column({type: 'text', default: null})
  address: string
}
