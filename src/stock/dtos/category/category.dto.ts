import { Product } from './../../models/product/product.entity';
import { IsDefined, IsString, IsEmpty } from 'class-validator';

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
