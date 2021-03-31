import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { Product } from 'src/stock/models/product/product.entity';
import { ProductDto } from 'src/stock/models/product/product.dto';
import { ProductService } from 'src/stock/services/product/product.service';

@Crud({
  model: {
    type: Product,
  },
  dto: {
    create: ProductDto,
    update: ProductDto,
    replace: ProductDto,
  },
  query: {
    join: {
      supplier: {
        eager: true,
        exclude: ['products'],
      },
      categories: {
        eager: true,
        exclude: ['product'],
      },
    },
  },
})
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private service: ProductService) {}
}
