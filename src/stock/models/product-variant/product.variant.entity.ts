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
import { Option } from '../option/option.entity';
import { OptionValue } from '../option-value/option.value.entity';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';

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
