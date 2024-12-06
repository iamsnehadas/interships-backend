import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async applyForInternship(@Body() body: {
    userId: number;
    internshipId: number;
  }) {
    return this.applicationService.applyForInternship(body.userId, body.internshipId);
  }

  @Get('user/:userId')
  async getApplicationsByUser(@Param('userId') userId: number) {
    return this.applicationService.getApplicationsByUser(userId);
  }

  @Get('internship/:internshipId')
  async getApplicationsByInternship(@Param('internshipId') internshipId: number) {
    return this.applicationService.getApplicationsByInternship(internshipId);
  }
}
