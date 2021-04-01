import { UserRepository } from './../../../users/repository/user.repository';
import { IPayload } from './../../interfaces/payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: IPayload) {
    const user = await this.userRepository.findOne({
      select: ['id', 'username'],
      relations: ['roles', 'roles.claims'],
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    return user;
  }
}
