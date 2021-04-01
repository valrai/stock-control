import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Claim } from '../../models/claim/claim.entity';

@Injectable()
export class ClaimService extends TypeOrmCrudService<Claim> {
  constructor(@InjectRepository(Claim) repo) {
    super(repo);
  }
}
