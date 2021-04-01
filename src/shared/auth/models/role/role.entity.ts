import { User } from '../../../users/models/user.entity';
import { Claim } from './../claim/claim.entity';
import { IAuditableEntity } from './../../../interfaces/auditable.interface';
import { IBaseEntity } from './../../../interfaces/base.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ROLES')
export class Role implements IBaseEntity, IAuditableEntity {
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

  @ManyToMany(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'USER_ROLES',

    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },

    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @ManyToMany(() => Claim, (claim) => claim.roles, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'ROLE_CLAIMS',

    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },

    inverseJoinColumn: {
      name: 'claim_id',
      referencedColumnName: 'id',
    },
  })
  claims: Claim[];
}
