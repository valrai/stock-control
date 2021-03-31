import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
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

  @Column('timestamp', { name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  products: Product[];
}
