import { CategoryDto } from './../../models/category/category.dto';
import { Category } from '../../models/category/category.entity';
import { Controller } from '@nestjs/common';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/stock/services/category/category.service';
import { Claims } from 'src/shared/auth/decorators/claims.decorator';

@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CategoryDto,
    update: CategoryDto,
    replace: CategoryDto,
  },
})
@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements CrudController<CategoryDto> {
  constructor(public service: CategoryService) {}

  get base(): CrudController<CategoryDto> {
    return this;
  }

  @Claims('register-one-category')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CategoryDto,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-categories')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-category')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-categories')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<CategoryDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-category')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CategoryDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-category')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CategoryDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-category')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-category')
  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return await this.base.deleteOneBase(req);
  }
}
