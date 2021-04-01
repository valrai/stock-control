import { Supplier } from '../../models/supplier/supplier.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class SupplierService extends TypeOrmCrudService<Supplier> {
  constructor(@InjectRepository(Supplier) repo) {
    super(repo);
  }

  async markDeleted(id: number) {
    await this.repo.softDelete({ id });
    return;
  }
}
