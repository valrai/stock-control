import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { ProductVariant } from 'src/stock/models/product-variant/product.variant.entity';
import { Controller } from '@nestjs/common';
import { ProductVariantService } from 'src/stock/services/product-variant/product.variant.service';
import { ProductVariantDto } from 'src/stock/models/product-variant/product.variant.dto';

@Crud({
  model: {
    type: ProductVariant,
  },
  dto: {
    create: ProductVariantDto,
    update: ProductVariantDto,
    replace: ProductVariantDto,
  },
  query: {
    join: {
      option: {
        eager: true,
        exclude: ['products', 'optionValues', 'productVariants'],
      },
      product: {
        eager: true,
        exclude: ['product', 'supplier', 'categories'],
      },
      optionValue: {
        eager: true,
        exclude: ['option', 'productVariant'],
      },
    },
  },
})
@ApiTags('product-variants')
@Controller('product-variants')
export class ProductVariantsController {
  constructor(private service: ProductVariantService) {}
}
