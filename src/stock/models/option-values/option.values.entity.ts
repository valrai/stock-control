import { ProductVariants } from './../product-variants/product.variants.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Option } from '../options/option.entity';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';

@Entity('OPTION_VALUES')
export class OptionValues
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'OPTION_VALUES' })
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

  @ManyToOne(() => Option, (option) => option.optionValues, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @OneToMany(() => ProductVariants, (pv) => pv.option, {
    eager: true,
    onDelete: 'CASCADE',
  })
  productVariants: ProductVariants[];
}
