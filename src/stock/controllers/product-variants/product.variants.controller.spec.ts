import { ProductVariantService } from '../../services/product-variant/product.variant.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantsController } from './product.variants.controller';

const mockProductVariantsService = () => ({});

describe('ProductVariantsController', () => {
  let controller: ProductVariantsController;
  let service: ProductVariantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantsController],
      providers: [
        {
          provide: ProductVariantService,
          useFactory: mockProductVariantsService,
        },
      ],
    }).compile();

    controller = module.get<ProductVariantsController>(
      ProductVariantsController,
    );
    service = module.get<ProductVariantService>(ProductVariantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
