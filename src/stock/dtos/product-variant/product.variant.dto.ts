import {
  IsDefined,
  IsString,
  IsEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { OptionValueDto } from '../option-value/option.value.dto';
import { OptionDto } from '../option/option.dto';
import { ProductDto } from '../product/product.dto';

export class ProductVariantDto {
  @IsString({ always: true })
  @IsDefined({ always: true })
  sku: string;

  @IsNumber()
  costPrice: number;

  @IsNumber()
  salePrice: number;

  @IsNumber()
  quantity: number;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  deletedAt?: Date;

  @ValidateNested({ always: true })
  product: ProductDto;

  @ValidateNested({ always: true })
  option: OptionDto;

  @ValidateNested({ always: true, each: true })
  optionValue: OptionValueDto[];
}
