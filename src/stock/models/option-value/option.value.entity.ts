import { ProductVariant } from '../product-variant/product.variant.entity';
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
import { Option } from '../option/option.entity';
import { IBaseEntity } from 'src/shared/interfaces/base.interface';
import { IAuditableEntity } from 'src/shared/interfaces/auditable.interface';
import { ILogicallyExcludableEntity } from 'src/shared/interfaces/logically.excludable.interface';

@Entity('OPTION_VALUES')
export class OptionValue
  implements IBaseEntity, IAuditableEntity, ILogicallyExcludableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'OPTION_VALUES' })
  value: string;

  @Column('timestamp')
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('timestamp')
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column('timestamp')
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => Option, (option) => option.optionValues, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @OneToMany(() => ProductVariant, (pv) => pv.option, {
    eager: true,
    onDelete: 'CASCADE',
  })
  productVariants: ProductVariant[];
}
