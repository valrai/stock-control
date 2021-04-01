import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/role/role.entity';

@Injectable()
export class ClaimGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRoles = (request?.user?.roles ?? []) as Role[];
    const requiredClaim = this.reflector.get<string>(
      'claim',
      context.getHandler(),
    );

    if (!requiredClaim) return true;

    return userRoles.some((r) => r.claims.some((c) => c.name == requiredClaim));
  }
}
