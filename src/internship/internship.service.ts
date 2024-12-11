import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InternshipService {
  constructor(private prisma: PrismaService) {}

  async getAllInternships(search?: string) {
    return this.prisma.internship.findMany({
      where: search
        ? { title: { contains: search, mode: 'insensitive' } }
        : {},
      include: {
        _count: {
          select: { applications: true }, 
        },
      },
    });
  }
  
  async createInternship(data: { title: string; description: string; company: string; location: string; deadline: Date }) {
    return this.prisma.internship.create({ data });
  }
  
  async getApplications(internshipId: number) {
    return this.prisma.application.findMany({
      where: { internshipId },
      include: { user: true },
    });
  }  
}
