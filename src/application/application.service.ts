import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async applyForInternship(userId: number, internshipId: number) {
    return this.prisma.application.create({
      data: {
        userId,
        internshipId,
        status: 'Applied', // default status
      },
    });
  }

  async getApplicationsByUser(userId: number) {
    return this.prisma.application.findMany({
      where: { userId },
    });
  }

  async getApplicationsByInternship(internshipId: number) {
    return this.prisma.application.findMany({
      where: { internshipId },
    });
  }

  async updateApplicationStatus(applicationId: number, status: string) {
    return this.prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });
  }
}
