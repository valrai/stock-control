import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { Product } from './../product/product.entity';
import { Category } from './../category/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'PRODUCT_CATEGORIES' })
export class ProductCategory implements IAuditableEntity {
  @Column('timestamp', { name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Category, (category) => category.productCategories, {
    primary: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Product, (product) => product.productCategories, {
    primary: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
