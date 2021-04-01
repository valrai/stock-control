import { UserRepository } from './../repository/user.repository';
import { User } from 'src/shared/users/models/user.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(public repo: UserRepository) {
    super(repo);
  }

  async markDeleted(id: number) {
    await this.repo.softDelete({ id });
    return;
  }
}
