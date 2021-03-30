import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';

@Module({
  providers: [],
  controllers: [ProductsController],
})
export class ProductsModule {}
