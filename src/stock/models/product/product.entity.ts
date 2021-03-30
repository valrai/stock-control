import { ProductOptions } from './../product-options/product.options.entity';
import { ProductCategory } from './../product-category/product.category.entity';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductVariants } from './../product-variants/product.variants.entity';
import { Supplier } from './../supplier/supplier.entity';

@Entity({ name: 'PRODUCTS' })
export class Product
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column('timestamp', { name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column('timestamp', { name: 'deleted_at' })
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.Products, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @OneToMany(() => ProductCategory, (pc) => pc.product, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  productCategories: ProductCategory[];

  @OneToMany(() => ProductOptions, (po) => po.product, {
    onDelete: 'CASCADE',
  })
  productOptions: ProductOptions[];

  @ManyToMany(() => ProductVariants, (pv) => pv.product, {
    onDelete: 'CASCADE',
  })
  variants: ProductVariants[];
}
