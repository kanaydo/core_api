import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'roles'})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({ type: 'text', unique: true })
  name:string

  @CreateDateColumn({ name: 'created_at' })
  createdAt:Date

  @Column("simple-array", { name: 'sections' })
  sections: string[];
}
