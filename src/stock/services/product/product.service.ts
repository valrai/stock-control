import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/stock/models/product/product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

  async markDeleted(id: number) {
    await this.repo.softDelete({ id });
    return;
  }
}
