import { Test, TestingModule } from '@nestjs/testing';
import { OptionValuesController } from './option.values.controller';

describe('OptionValuesController', () => {
  let controller: OptionValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionValuesController],
    }).compile();

    controller = module.get<OptionValuesController>(OptionValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
