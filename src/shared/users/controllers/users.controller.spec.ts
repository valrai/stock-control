import { UserService } from './../services/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

const mockUserService = () => ({});

describe('UsersController', () => {
  let controller: UsersController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useFactory: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
