import { Claims } from './../../../shared/auth/decorators/claims.decorator';
import { OptionValueService } from './../../services/option-value/option.value.service';
import { OptionValue } from './../../models/option-value/option.value.entity';
import { OptionValueDto } from '../../dtos/option-value/option.value.dto';
import {
  Crud,
  CrudRequest,
  Override,
  CreateManyDto,
  ParsedBody,
  ParsedRequest,
  CrudController,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';

@Crud({
  model: {
    type: OptionValue,
  },
  dto: {
    create: OptionValueDto,
    update: OptionValueDto,
    replace: OptionValueDto,
  },
  query: {
    join: {
      option: {
        eager: true,
        exclude: ['optionValues'],
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('option-values')
@Controller('option-values')
export class OptionValuesController implements CrudController<OptionValueDto> {
  constructor(public service: OptionValueService) {}

  get base(): CrudController<OptionValueDto> {
    return this;
  }

  @Claims('register-one-option-value')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OptionValue,
  ) {
    const entity = await this.service.findOne({
      withDeleted: true,
      where: { option: dto.option, value: dto.value, deletedAt: Not(IsNull()) },
    });

    if (entity != null) {
      return this.service.recoverOne(req);
    }

    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-option-values')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-option-value')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-option-values')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<OptionValueDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-option-value')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OptionValueDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-option-value')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OptionValueDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-option-value')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-option-value')
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
