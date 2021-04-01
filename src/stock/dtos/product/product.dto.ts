import { SupplierDto } from './../supplier/supplier.dto';
import { IsDefined, IsString, IsEmpty, ValidateNested } from 'class-validator';
import { Category } from 'src/stock/models/category/category.entity';

export class ProductDto {
  @IsString({ always: true })
  @IsDefined({ always: true })
  name: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  deletedAt?: Date;

  @ValidateNested({ always: true })
  @IsDefined({ always: true })
  supplier: SupplierDto;

  @ValidateNested({ each: true, always: true })
  categories: Category[];
}
