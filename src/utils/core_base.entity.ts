import { Transform } from "class-transformer";
import { format } from "date-fns";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

abstract class CoreBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Transform(({ value }) => format(value, 'dd/MM/yyyy HH:MM:SS'))
  @CreateDateColumn()
  createdAt: Date

  @Transform(({ value }) => format(value, 'dd/MM/yyyy HH:MM:SS'))
  @UpdateDateColumn()
  updatedAt: Date  
}

export default CoreBaseEntity;