import { ProductOptions } from './../product-options/product.options.entity';
import { ProductVariants } from './../product-variants/product.variants.entity';
import { OptionValues } from './../option-values/option.values.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';

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

  @OneToMany(() => ProductOptions, (po) => po.option)
  productOptions: ProductOptions[];

  @OneToMany(() => OptionValues, (ov) => ov.option, {
    onDelete: 'CASCADE',
  })
  optionValues: OptionValues[];

  @OneToMany(() => ProductVariants, (pv) => pv.option, { onDelete: 'CASCADE' })
  productVariants: ProductVariants[];
}
