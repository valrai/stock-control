import { RoleSeederService } from './../role-seeder/role.seeder.service';
import { ClaimSeederService } from './../claim-seeder/claim.seeder.service';
import { Injectable } from '@nestjs/common';
import { UserSeederService } from '../user-seeder/user.seeder.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class SeederService {
  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly claimsSeedService: ClaimSeederService,
    private readonly rolesSeedService: RoleSeederService,
  ) {}

  private readonly logger = new Logger('SeederService');

  async seed() {
    await this.claims()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding claims...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding claims...');
        Promise.reject(error);
      });

    await this.roles()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding roles...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding roles...');
        Promise.reject(error);
      });

    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  private async users() {
    return await Promise.all(this.userSeederService.create())
      .then((createdUsers) => {
        this.logger.verbose(
          'No. of users created : ' +
            createdUsers.filter(
              (nullValueOrCreatedUser) => nullValueOrCreatedUser,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  private async claims() {
    return await Promise.all(this.claimsSeedService.create())
      .then((createdClaims) => {
        this.logger.verbose(
          'No. of claims created : ' +
            createdClaims.filter(
              (nullValueOrCreatedClaim) => nullValueOrCreatedClaim,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  private async roles() {
    return await Promise.all(this.rolesSeedService.create())
      .then((createdRoles) => {
        this.logger.verbose(
          'No. of roles created : ' +
            createdRoles.filter(
              (nullValueOrCreatedRoles) => nullValueOrCreatedRoles,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
