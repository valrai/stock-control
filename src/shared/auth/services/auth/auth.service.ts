import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './../../../users/repository/user.repository';
import { CredentialsDto } from '../../dtos/credentials/credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private repo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.repo.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
