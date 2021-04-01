import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/shared/auth/models/role/role.entity';
import { Repository } from 'typeorm';
import { rolesSeed } from '../../seeds/roles.seed';

@Injectable()
export class RoleSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  create(): Array<Promise<Role>> {
    return rolesSeed.map(async (role: Role) => {
      return await this.roleRepository
        .findOne({ name: role.name })
        .then((dbLangauge) => {
          if (dbLangauge) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.roleRepository.save(role));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
