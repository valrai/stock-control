import { Claims } from './../../../shared/auth/decorators/claims.decorator';
import { OptionService } from './../../services/option/option.service';
import { OptionDto } from '../../dtos/option/option.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudRequest,
  Override,
  CreateManyDto,
  ParsedBody,
  ParsedRequest,
  CrudController,
} from '@nestjsx/crud';
import { Option } from '../../models/option/option.entity';
import { Controller } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';

@Crud({
  model: {
    type: Option,
  },
  dto: {
    create: OptionDto,
    update: OptionDto,
    replace: OptionDto,
  },
  query: {
    join: {
      optionValues: {
        eager: true,
        exclude: ['option'],
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('options')
@Controller('options')
export class OptionsController implements CrudController<OptionDto> {
  constructor(public service: OptionService) {}

  get base(): CrudController<OptionDto> {
    return this;
  }

  @Claims('register-one-option')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OptionDto,
  ) {
    const entity = await this.service.findOne({
      withDeleted: true,
      where: { name: dto.name, deletedAt: Not(IsNull()) },
    });

    if (entity != null) {
      return this.service.recoverOne(req);
    }

    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-options')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-option')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-options')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<OptionDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-option')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OptionDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-option')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: OptionDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-option')
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
