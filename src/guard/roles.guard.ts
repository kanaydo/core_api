import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/utils/require_permissions.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (!requiredRoles) {
    //   return true;
    // }
    // const { administrator } = context.switchToHttp().getRequest();
    // console.log('==============> ', administrator)
    // return requiredRoles.some((role) => administrator.roles?.includes(role));
    return true;
  }
}