import { Role } from './../../auth/models/role/role.entity';
import { ILogicallyExcludableEntity } from './../../interfaces/logically.excludable.interface';
import { IAuditableEntity } from './../../interfaces/auditable.interface';
import { IBaseEntity } from './../../interfaces/base.interface';
import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USERS')
export class User
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Index({ unique: true })
  username: string;

  @Column({ length: 100 })
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column('timestamp')
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('timestamp')
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column('timestamp')
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
