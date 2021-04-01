import { ProductVariant } from '../../models/product-variant/product.variant.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductVariantService extends TypeOrmCrudService<ProductVariant> {
  constructor(@InjectRepository(ProductVariant) repo) {
    super(repo);
  }

  async markDeleted(id: number) {
    await this.repo.softDelete({ id });
    return;
  }
}
