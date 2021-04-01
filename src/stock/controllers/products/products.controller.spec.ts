import { ProductService } from '../../services/product/product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';

const mockProductService = () => ({});

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductService, useFactory: mockProductService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
