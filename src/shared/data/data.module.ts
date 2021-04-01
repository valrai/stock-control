import { ClaimSeederService } from './services/claim-seeder/claim.seeder.service';
import { UserRepository } from './../users/repository/user.repository';
import { Module } from '@nestjs/common';
import { UserSeederService } from './services/user-seeder/user.seeder.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSeederService } from './services/role-seeder/role.seeder.service';
import { SeederService } from './services/seeder/seeder.service';
import { Claim } from '../auth/models/claim/claim.entity';
import { Role } from '../auth/models/role/role.entity';

@Module({
  providers: [
    UserSeederService,
    SeederService,
    ClaimSeederService,
    RoleSeederService,
  ],
  imports: [TypeOrmModule.forFeature([UserRepository, Claim, Role])],
})
export class DataModule {}
