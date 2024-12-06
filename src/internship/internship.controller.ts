import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InternshipService } from './internship.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/roles.guard'; // Assuming this enum has values like 'ADMIN', 'USER'

@Controller('internships')
export class InternshipController {
  constructor(private readonly internshipService: InternshipService) {}

  // Route to create a new internship (only employers allowed)
  @Post()
  @Roles(Role.EMPLOYER) // Only employers can create internships
  @UseGuards(AuthGuard, RolesGuard) // First authenticate, then check roles
  async createInternship(@Body() body: { title: string; description: string; company: string; location: string; deadline: Date }) {
    return this.internshipService.createInternship(body);
  }

  // Route to get all internships (students and employers can view internships)
  @Get()
  @Roles(Role.EMPLOYER, Role.STUDENT) // Employers and students can view internships
  @UseGuards(AuthGuard, RolesGuard) // First authenticate, then check roles
  async getAllInternships() {
    return this.internshipService.getAllInternships();
  }

  // Route to get a specific internship by ID (accessible to all roles)
  @Get(':id')
  @Roles(Role.EMPLOYER, Role.STUDENT, Role.ADMIN) // All roles can view an internship
  @UseGuards(AuthGuard, RolesGuard) // First authenticate, then check roles
  async getInternshipById(@Param('id') id: string) {
    return this.internshipService.getInternshipById(Number(id));
  }
}
