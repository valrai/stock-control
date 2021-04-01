import { ProductDto } from './../../models/product/product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { Product } from 'src/stock/models/product/product.entity';
import { ProductService } from 'src/stock/services/product/product.service';
import { IsNull, Not } from 'typeorm';
import { Claims } from 'src/shared/auth/decorators/claims.decorator';

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
@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController implements CrudController<ProductDto> {
  constructor(public service: ProductService) {}

  get base(): CrudController<ProductDto> {
    return this;
  }

  @Claims('register-one-product')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProductDto,
  ) {
    const entity = await this.service.findOne({
      withDeleted: true,
      where: {
        name: dto.name,
        supplier: dto.supplier,
        deletedAt: Not(IsNull()),
      },
    });

    if (entity != null) {
      return await this.service.recoverOne(req);
    }

    return await this.base.createOneBase(req, dto);
  }

  @Claims('list-all-products')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-product')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-products')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<ProductDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-product')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProductDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-product')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProductDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-product')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-product')
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
