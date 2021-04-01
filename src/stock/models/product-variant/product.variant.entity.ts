import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OptionValue } from '../option-value/option.value.entity';
import { Option } from '../option/option.entity';
import { IAuditableEntity } from './../../../shared/interfaces/auditable.interface';
import { IBaseEntity } from './../../../shared/interfaces/base.interface';
import { ILogicallyExcludableEntity } from './../../../shared/interfaces/logically.excludable.interface';
import { Product } from './../product/product.entity';

@Entity({ name: 'PRODUCT_VARIANTS' })
export class ProductVariant
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

  @Column('timestamp')
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('timestamp')
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column('timestamp')
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => Product, (product) => product.variants, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Option, (option) => option.productVariants, {
    nullable: false,
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @ManyToOne(() => OptionValue, (ov) => ov.productVariants, {
    nullable: false,
  })
  @JoinColumn({ name: 'option_value_id' })
  optionValue: OptionValue[];
}
