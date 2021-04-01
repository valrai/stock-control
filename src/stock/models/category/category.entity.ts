import { IAuditableEntity } from './../../../shared/interfaces/auditable.interface';
import { IBaseEntity } from './../../../shared/interfaces/base.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity({ name: 'CATEGORIES' })
export class Category implements IBaseEntity, IAuditableEntity {
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

  @OneToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  products: Product[];
}
