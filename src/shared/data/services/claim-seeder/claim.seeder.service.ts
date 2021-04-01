import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from 'src/shared/auth/models/claim/claim.entity';
import { Repository } from 'typeorm';
import { claimsSeed } from '../../seeds/claims.seed';

@Injectable()
export class ClaimSeederService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {}
  create(): Array<Promise<Claim>> {
    return claimsSeed.map(async (claim: Claim) => {
      return await this.claimRepository
        .findOne({ name: claim.name })
        .then((dbLangauge) => {
          if (dbLangauge) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.claimRepository.save(claim));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
