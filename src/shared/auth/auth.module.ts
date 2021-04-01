import { UserRepository } from './../users/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { Claim } from './models/claim/claim.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './services/role/role.service';
import { ClaimService } from './services/claim/claim.service';
import { ClaimsController } from './controllers/claim/claim.controller';
import { RolesController } from './controllers/role/role.controller';
import { Role } from './models/role/role.entity';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategyService } from './services/jwt-strategy/jwt.strategy.service';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { ClaimGuard } from './guards/claim.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Claim, UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_TOKEN_EXPIRATION'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    RoleService,
    ClaimService,
    AuthService,
    JwtStrategyService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ClaimGuard },
  ],
  controllers: [AuthController, RolesController, ClaimsController],
  exports: [JwtStrategyService, PassportModule],
})
export class AuthModule {}
