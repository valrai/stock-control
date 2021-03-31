import { ProductVariantsController } from './controllers/product-variants/product.variants.controller';
import { ProductVariant } from 'src/stock/models/product-variant/product.variant.entity';
import { OptionValue } from './models/option-value/option.value.entity';
import { Option } from './models/option/option.entity';
import { Supplier } from './models/supplier/supplier.entity';
import { Category } from './models/category/category.entity';
import { Module } from '@nestjs/common';
import { CategoryService } from './services/category/category.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierService } from './services/supplier/supplier.service';
import { ProductService } from './services/product/product.service';
import { ProductsController } from './controllers/products/products.controller';
import { Product } from './models/product/product.entity';
import { OptionService } from './services/option/option.service';
import { OptionValueService } from './services/option-value/option.value.service';
import { ProductVariantService } from './services/product-variant/product.variant.service';
import { SuppliersController } from './controllers/suppliers/suppliers.controller';
import { OptionsController } from './controllers/options/options.controller';
import { OptionValuesController } from './controllers/option-values/option.values.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Option,
      OptionValue,
      Product,
      ProductVariant,
      Supplier,
    ]),
  ],
  providers: [
    CategoryService,
    SupplierService,
    ProductService,
    OptionService,
    OptionValueService,
    ProductVariantService,
  ],
  controllers: [
    ProductsController,
    CategoriesController,
    SuppliersController,
    OptionsController,
    OptionValuesController,
    ProductVariantsController,
  ],
})
export class StockModule {}
