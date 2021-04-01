import { OptionService } from './../../services/option/option.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OptionsController } from './options.controller';

const mockOptionService = () => ({});

describe('OptionsController', () => {
  let controller: OptionsController;
  let service: OptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionsController],
      providers: [{ provide: OptionService, useFactory: mockOptionService }],
    }).compile();

    controller = module.get<OptionsController>(OptionsController);
    service = module.get<OptionService>(OptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
