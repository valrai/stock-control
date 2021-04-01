import { ProductVariant } from './../../models/product-variant/product.variant.entity';
import { OptionDto } from '../option/option.dto';
import { IsDefined, IsString, IsEmpty, ValidateNested } from 'class-validator';

export class OptionValueDto {
  @IsDefined({ always: true })
  @IsString({ always: true })
  value: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  deletedAt?: Date;

  @ValidateNested({ always: true })
  option: OptionDto;

  @IsEmpty({ always: true })
  productVariants: ProductVariant[];
}
