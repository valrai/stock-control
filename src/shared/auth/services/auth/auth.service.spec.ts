import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './../../../users/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

const mockUserRepository = () => ({});
const mockJwtService = () => ({});

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(repository).toBeDefined();
  });
});
