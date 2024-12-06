import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

// Enum to define user roles
export enum Role {
  ADMIN = 'admin',
  EMPLOYER = 'employer',
  STUDENT = 'student',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Retrieve roles metadata applied to the handler (route)
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    
    if (!requiredRoles) {
      return true; // If no roles are required, access is granted
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Get the user from the request (authenticated user)

    if (!user) {
      return false; // If no user is found in the request, deny access
    }

    // Check if the user's role is included in the required roles
    return requiredRoles.some(role => user.role === role);
  }
}
