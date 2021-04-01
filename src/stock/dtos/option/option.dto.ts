import { IsDefined, IsEmpty, IsString, ValidateNested } from 'class-validator';
import { ProductVariant } from '../../models/product-variant/product.variant.entity';
import { ProductDto } from '../product/product.dto';
import { OptionValue } from './../../models/option-value/option.value.entity';

export class OptionDto {
  @IsString({ always: true })
  @IsDefined({ always: true })
  name: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  deletedAt?: Date;

  @ValidateNested({ each: true, always: true })
  products: ProductDto[];

  @ValidateNested({ each: true, always: true })
  optionValues: OptionValue[];

  @IsEmpty({ always: true })
  productVariants: ProductVariant[];
}
