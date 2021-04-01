import { IAuditableEntity } from './../../../interfaces/auditable.interface';
import { IBaseEntity } from './../../../interfaces/base.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity('CLAIMS')
export class Claim implements IBaseEntity, IAuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('timestamp')
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('timestamp')
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToMany(() => Role, (role) => role.claims)
  roles: Role[];
}
