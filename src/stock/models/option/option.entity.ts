import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OptionValue } from '../option-value/option.value.entity';
import { ProductVariant } from '../product-variant/product.variant.entity';
import { Product } from '../product/product.entity';
import { IAuditableEntity } from './../../../shared/interfaces/auditable.interface';
import { IBaseEntity } from './../../../shared/interfaces/base.interface';
import { ILogicallyExcludableEntity } from './../../../shared/interfaces/logically.excludable.interface';

@Entity({ name: 'OPTIONS' })
export class Option
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

  @ManyToMany(() => Product, (product) => product.options)
  products: Product[];

  @OneToMany(() => OptionValue, (ov) => ov.option, {
    onDelete: 'CASCADE',
  })
  optionValues: OptionValue[];

  @OneToMany(() => ProductVariant, (pv) => pv.option, { onDelete: 'CASCADE' })
  productVariants: ProductVariant[];
}
