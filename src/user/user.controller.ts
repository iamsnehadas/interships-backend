import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator'; // Import the Roles decorator
import { RolesGuard } from '../auth/roles.guard'; // Import the Roles guard
import { AuthGuard } from '../auth/auth.guard'; // Import the Auth guard
import { Role } from '../auth/roles.guard'; // Import the Role enum

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN) // Only admin can create users
  @UseGuards(AuthGuard, RolesGuard) // First check AuthGuard, then RolesGuard
  async createUser(@Body() body: { name: string; email: string; password: string; role: string }) {
    return this.userService.createUser(body);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EMPLOYER, Role.STUDENT) // All roles can view users
  @UseGuards(AuthGuard, RolesGuard) // First check AuthGuard, then RolesGuard
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
