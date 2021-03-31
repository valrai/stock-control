import { Test, TestingModule } from '@nestjs/testing';
import { OptionValueService as OptionValueService } from './option.value.service';

describe('OptionValueService', () => {
  let service: OptionValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionValueService],
    }).compile();

    service = module.get<OptionValueService>(OptionValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
