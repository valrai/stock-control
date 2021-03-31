import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from 'src/stock/models/product-variant/product.variant.entity';

@Injectable()
export class ProductVariantService extends TypeOrmCrudService<ProductVariant> {
  constructor(@InjectRepository(ProductVariant) repo) {
    super(repo);
  }
}
