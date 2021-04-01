import { Category } from './../category/category.entity';
import { Option } from '../option/option.entity';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Supplier } from '../supplier/supplier.entity';
import { ProductVariant } from '../product-variant/product.variant.entity';

@Entity({ name: 'PRODUCTS' })
export class Product
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
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

  @Column('timestamp')
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.Products, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToMany(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'PRODUCT_CATEGORIES',

    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },

    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @ManyToMany(() => Option, (option) => option.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'PRODUCT_OPTIONS',

    joinColumn: {
      name: 'option_id',
      referencedColumnName: 'id',
    },

    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  options: Option[];

  @ManyToMany(() => ProductVariant, (pv) => pv.product, {
    onDelete: 'CASCADE',
  })
  variants: ProductVariant[];
}
