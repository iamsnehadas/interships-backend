import { Body, Controller, Get, Post, Query, Param, UseGuards } from '@nestjs/common';
import { InternshipService } from './internship.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.guard';

@Controller('internship')
export class InternshipController {
  constructor(private internshipService: InternshipService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.STUDENT)
  @Get()
  getAllInternships() {
    return this.internshipService.getAllInternships();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.EMPLOYER)
  @Post('create')
  createInternship(@Body() data: { title: string; description: string; company: string; location: string; deadline: Date }) {
    return this.internshipService.createInternship(data);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.EMPLOYER)
  @Get('applications/:id')
  getApplications(@Param('id') internshipId: number) {
    return this.internshipService.getApplications(internshipId);
  }
}
