import {
  Crud,
  CrudRequest,
  CreateManyDto,
  Override,
  ParsedBody,
  ParsedRequest,
  CrudController,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductVariant } from 'src/stock/models/product-variant/product.variant.entity';
import { Controller } from '@nestjs/common';
import { ProductVariantService } from 'src/stock/services/product-variant/product.variant.service';
import { IsNull, Not } from 'typeorm';
import { Claims } from 'src/shared/auth/decorators/claims.decorator';
import { ProductVariantDto } from 'src/stock/dtos/product-variant/product.variant.dto';

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
@ApiBearerAuth()
@ApiTags('product-variants')
@Controller('product-variants')
export class ProductVariantsController
  implements CrudController<ProductVariantDto> {
  constructor(public service: ProductVariantService) {}

  get base(): CrudController<ProductVariantDto> {
    return this;
  }

  @Claims('register-one-product-variant')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProductVariantDto,
  ) {
    const entity = await this.service.findOne({
      withDeleted: true,
      where: {
        sku: dto.sku,
        product: dto.product,
        option: dto.option,
        optionValue: dto.optionValue,
        deletedAt: Not(IsNull()),
      },
    });

    if (entity != null) {
      entity.costPrice = dto.costPrice;
      entity.salePrice = dto.salePrice;
      entity.quantity = dto.quantity;

      return this.service.replaceOne(req, entity);
    }

    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-product-variants')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-product-variant')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-product-variants')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<ProductVariantDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-product-variant')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProductVariantDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-product-variant')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProductVariantDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-product-variant')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-product-variant')
  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    const entity = await this.getOneBase(req);
    const id = req.parsed.paramsFilter.find(
      (f) => f.field === 'id' && f.operator === '$eq',
    ).value;

    if (entity && entity.deletedAt != null) {
      return await this.service.markDeleted(id);
    }

    return await this.base.deleteOneBase(req);
  }
}
