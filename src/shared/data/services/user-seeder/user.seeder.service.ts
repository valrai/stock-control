import { usersSeed } from './../../seeds/users.seed';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/users/models/user.entity';
import { UserRepository } from 'src/shared/users/repository/user.repository';

@Injectable()
export class UserSeederService {
  constructor(@InjectRepository(UserRepository) private repo: UserRepository) {}

  create(): Array<Promise<User>> {
    return usersSeed.map(async (user: User) => {
      return await this.repo
        .findOne({
          where: [{ username: user.username }, { email: user.email }],
        })
        .then((entity) => {
          if (entity) {
            return Promise.resolve(null);
          }

          return Promise.resolve(this.repo.save(user));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
