import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.guard'; // Import the Role enum

export const ROLES_KEY = 'roles'; // Metadata key to store roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
