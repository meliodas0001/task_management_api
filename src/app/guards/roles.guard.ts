import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@prisma/client';
import { RolesPermissionService } from '../services/roles/rolesPermission.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly rolesPermissionService: RolesPermissionService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const user = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const userRoles = await this.rolesPermissionService.verifyUserPermission(
      user.id,
      request.body.containerId,
    );

    if (!userRoles) {
      return false;
    }

    return requiredRoles.some((role) => userRoles[0].name === role);
  }
}
