import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Option } from '../../models/option/option.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OptionService extends TypeOrmCrudService<Option> {
  constructor(@InjectRepository(Option) repo) {
    super(repo);
  }

  async markDeleted(id: number) {
    await this.repo.softDelete({ id });
    return;
  }
}
