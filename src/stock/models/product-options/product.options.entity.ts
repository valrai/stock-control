import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { Option } from './../options/option.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity({ name: 'PRODUCT_OPTIONS' })
export class ProductOptions implements IAuditableEntity {
  @Column('timestamp', { name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Product, (product) => product.productOptions, {
    primary: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Option, (option) => option.productOptions, { primary: true })
  @JoinColumn({ name: 'option_id' })
  option: Option;
}
