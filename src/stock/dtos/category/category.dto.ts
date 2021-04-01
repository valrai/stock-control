import { IsDefined, IsString, IsEmpty } from 'class-validator';
import { Product } from 'src/stock/models/product/product.entity';

export class CategoryDto {
  id: number;

  @IsDefined({ always: true })
  @IsString({ always: true })
  name: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  products: Product[];
}
