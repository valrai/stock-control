import { Controller } from '@nestjs/common';
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
import { Claims } from '../../decorators/claims.decorator';
import { RoleDto } from '../../dtos/role/role.dto';
import { Role } from '../../models/role/role.entity';
import { RoleService } from '../../services/role/role.service';

@Crud({
  model: {
    type: Role,
  },
  dto: {
    create: RoleDto,
    update: RoleDto,
    replace: RoleDto,
  },
  query: {
    join: {
      roles: {
        eager: true,
        exclude: ['roles'],
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController implements CrudController<RoleDto> {
  constructor(public service: RoleService) {}

  get base(): CrudController<RoleDto> {
    return this;
  }

  @Claims('register-one-role')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: RoleDto,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-roles')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-role')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-roles')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<RoleDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-role')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: RoleDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-role')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: RoleDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-role')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-role')
  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return await this.base.deleteOneBase(req);
  }
}
