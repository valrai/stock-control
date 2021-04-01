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
import { ClaimDto } from '../../dtos/claim/claim.dto';
import { Claim } from '../../models/claim/claim.entity';
import { ClaimService } from '../../services/claim/claim.service';

@Crud({
  model: {
    type: Claim,
  },
  dto: {
    create: ClaimDto,
    update: ClaimDto,
    replace: ClaimDto,
  },
})
@ApiBearerAuth()
@ApiTags('claims')
@Controller('claims')
export class ClaimsController implements CrudController<ClaimDto> {
  constructor(public service: ClaimService) {}

  get base(): CrudController<ClaimDto> {
    return this;
  }

  @Claims('register-one-claim')
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ClaimDto,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Claims('list-all-claims')
  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Claims('find-one-claim')
  @Override()
  async getOneBase(@ParsedRequest() req: CrudRequest) {
    return await this.base.getOneBase(req);
  }

  @Claims('register-many-claims')
  @Override()
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<ClaimDto>,
  ) {
    return await this.base.createManyBase(req, dto);
  }

  @Claims('update-one-claim')
  @Override()
  async updateOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ClaimDto,
  ) {
    return await this.base.updateOneBase(req, dto);
  }

  @Claims('replace-one-claim')
  @Override()
  async replaceOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ClaimDto,
  ) {
    return await this.base.replaceOneBase(req, dto);
  }

  @Claims('recover-one-claim')
  async recoverOneBase(req: CrudRequest) {
    return await this.base.recoverOneBase(req);
  }

  @Claims('delete-one-claim')
  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return await this.base.deleteOneBase(req);
  }
}
