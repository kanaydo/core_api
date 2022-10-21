

import { AfterUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'administrators'})
export class Administrator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', unique: true, name: 'username'})
  username:string

  @Column({type: 'text', name: 'password_digest'})
  passwordDigest:string

  @CreateDateColumn({name: 'created_at'})
  createdAt:Date

  @Column("simple-array", { name: 'role_list', nullable: true })
  roleList: number[];
}
