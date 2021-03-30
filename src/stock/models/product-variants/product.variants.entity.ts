import { Product } from './../product/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Option } from '../options/option.entity';
import { OptionValues } from '../option-values/option.values.entity';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';

@Entity({ name: 'PRODUCT_VARIANTS' })
export class ProductVariants
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column('float', { name: 'cost-price' })
  costPrice: number;

  @Column('float', { name: 'sale-price' })
  salePrice: number;

  @Column({ default: 0 })
  quantity: number;

  @Column('timestamp', { name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column('timestamp', { name: 'deleted_at' })
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Product, (product) => product.variants, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Option, (option) => option.productVariants, {
    nullable: false,
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @ManyToOne(() => OptionValues, (ov) => ov.productVariants, {
    nullable: false,
  })
  @JoinColumn({ name: 'option_value_id' })
  optionValue: OptionValues[];
}