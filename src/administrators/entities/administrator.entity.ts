

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Administrator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', unique: true})
  username:string

  @Column({type: 'text'})
  passwordDigest:string
}
