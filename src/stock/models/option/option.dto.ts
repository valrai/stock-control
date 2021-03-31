import { OptionValue } from '../option-value/option.value.entity';
import { ProductVariant } from '../product-variant/product.variant.entity';
import { IsDefined, IsString, IsEmpty, ValidateNested } from 'class-validator';
import { ProductDto } from '../product/product.dto';

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
