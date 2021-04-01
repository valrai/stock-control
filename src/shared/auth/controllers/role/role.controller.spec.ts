import { RoleService } from './../../services/role/role.service';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './role.controller';

const mockRoleService = () => ({});

describe('RoleController', () => {
  let controller: RolesController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RoleService,
          useFactory: mockRoleService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
