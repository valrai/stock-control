import { ProductVariant } from '../product-variant/product.variant.entity';
import { OptionValue } from '../option-value/option.value.entity';
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
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';
import { Product } from '../product/product.entity';

@Entity({ name: 'OPTIONS' })
export class Option
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
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

  @Column('timestamp', { name: 'deleted_at' })
  @DeleteDateColumn()
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
