import { Expose } from "class-transformer";
import CoreBaseEntity from "src/utils/core_base.entity";
import { Column, Entity } from "typeorm";
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
  @Column({type: 'text', name: 'first_name'})
  firstName: string

  @Column({type: 'text', name: 'last_name'})
  lastName: string

  @Column({type: 'text', unique: true, name: 'email'})
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

  @Column({type: 'text', unique: true, name: 'phone', default: null})
  phone: string

  @Column({type: 'text', name: 'address', default: null})
  address: string
}
