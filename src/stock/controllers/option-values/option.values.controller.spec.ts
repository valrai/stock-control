import { OptionValueService } from './../../services/option-value/option.value.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OptionValuesController } from './option.values.controller';

const mockOptionValueService = () => ({});

describe('OptionValuesController', () => {
  let controller: OptionValuesController;
  let service: OptionValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionValuesController],
      providers: [
        { provide: OptionValueService, useFactory: mockOptionValueService },
      ],
    }).compile();

    controller = module.get<OptionValuesController>(OptionValuesController);
    service = module.get<OptionValueService>(OptionValueService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
