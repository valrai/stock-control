import { ClaimService } from './../../services/claim/claim.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claim.controller';

const mockClaimService = () => ({});

describe('ClaimController', () => {
  let controller: ClaimsController;
  let service: ClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [
        {
          provide: ClaimService,
          useFactory: mockClaimService,
        },
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
