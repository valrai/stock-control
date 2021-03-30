import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity({ name: 'SUPPLIER' })
export class Supplier
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ name: 'trade_name' })
  tradeName: string;

  @Column('timestamp', { name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column('timestamp', { name: 'deleted_at' })
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Product, (product) => product.supplier)
  Products: Product[];
}
