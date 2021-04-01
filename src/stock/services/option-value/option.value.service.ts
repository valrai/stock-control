import { OptionValue } from '../../models/option-value/option.value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionValueService extends TypeOrmCrudService<OptionValue> {
  constructor(@InjectRepository(OptionValue) repo) {
    super(repo);
  }

  async markDeleted(id: number) {
    await this.repo.softDelete({ id });
    return;
  }
}
