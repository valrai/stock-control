import { SupplierService } from './../../services/supplier/supplier.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersController } from './suppliers.controller';

const mockSupplierService = () => ({});

describe('SuppliersController', () => {
  let controller: SuppliersController;
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuppliersController],
      providers: [
        { provide: SupplierService, useFactory: mockSupplierService },
      ],
    }).compile();

    controller = module.get<SuppliersController>(SuppliersController);
    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
