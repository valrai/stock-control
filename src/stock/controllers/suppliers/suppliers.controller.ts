import { SupplierService } from '../../services/supplier/supplier.service';
import { Supplier } from '../../models/supplier/supplier.entity';
import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  CreateManyDto,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsNull, Not } from 'typeorm';
import { Claims } from 'src/shared/auth/decorators/claims.decorator';
import { SupplierDto } from 'src/stock/dtos/supplier/supplier.dto';

@Crud({
  model: {
    type: Supplier,
  },
  dto: {
    create: SupplierDto,
    update: SupplierDto,
    replace: SupplierDto,
  },
})
@ApiBearerAuth()
@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController implements CrudController<SupplierDto> {
  constructor(public service: SupplierService) {}

  get base(): CrudController<SupplierDto> {
    return this;
  }

  @Claims('register-supplier')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: SupplierDto,
  ) {
    const entity = await this.service.findOne({
      withDeleted: true,
      where: { cnpj: dto.cnpj, deletedAt: Not(IsNull()) },
    });

    if (entity != null) {
      entity.deletedAt = null;
      entity.tradeName = dto.tradeName;

      return this.service.replaceOne(req, entity);
    }

    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-suppliers')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-supplier')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-suppliers')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<SupplierDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-supplier')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: SupplierDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-supplier')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: SupplierDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-supplier')
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
