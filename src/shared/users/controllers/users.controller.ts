import { Claims } from './../../auth/decorators/claims.decorator';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
  CreateManyDto,
} from '@nestjsx/crud';
import { Not, IsNull } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import { UserService } from '../services/users.service';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserDto,
    update: UserDto,
    replace: UserDto,
  },
  query: {
    exclude: ['password', 'salt'],
    join: {
      roles: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<UserDto> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserDto> {
    return this;
  }

  @Claims('register-one-user')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDto,
  ) {
    const entity = await this.service.findOne({
      withDeleted: true,
      where: [
        { username: dto.username, deletedAt: Not(IsNull()) },
        { email: dto.email, deletedAt: Not(IsNull()) },
      ],
    });

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    if (entity != null) {
      entity.password = password;
      entity.salt = salt;
      entity.deletedAt = null;

      return this.service.updateOne(req, entity);
    }

    dto.password = password;
    dto.salt = salt;

    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-users')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-user')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-users')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<UserDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-user')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDto,
  ) {
    const salt = await bcrypt.getSalt();
    const password = await bcrypt.hash(dto.password, salt);

    dto.password = password;
    dto.salt = salt;

    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-user')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDto,
  ) {
    const salt = await bcrypt.getSalt();
    const password = await bcrypt.hash(dto.password, salt);

    dto.password = password;
    dto.salt = salt;

    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-user')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-user')
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
