import { SupplierService } from '../../services/supplier/supplier.service';
import { Supplier } from '../../models/supplier/supplier.entity';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { SupplierDto } from 'src/stock/models/supplier/supplier.dto';

@Crud({
  model: {
    type: Supplier,
  },
  dto: {
    create: SupplierDto,
    update: SupplierDto,
    replace: SupplierDto,
  },
})
@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private service: SupplierService) {}
}
