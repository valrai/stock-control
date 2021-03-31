import { OptionDto } from 'src/stock/models/option/option.dto';
import { OptionValueDto } from 'src/stock/models/option-value/option.value.dto';
import { ProductDto } from 'src/stock/models/product/product.dto';
import {
  IsDefined,
  IsString,
  IsEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';

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
