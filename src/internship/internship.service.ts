import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InternshipService {
  constructor(private prisma: PrismaService) {}

  async createInternship(data: {
    title: string;
    description: string;
    company: string;
    location: string;
    deadline: Date;
  }) {
    try {
      return this.prisma.internship.create({
        data,
      });
    } catch (error) {
      throw new Error('Error creating internship');
    }
  }

  async getAllInternships() {
    try {
      return this.prisma.internship.findMany();
    } catch (error) {
      throw new Error('Error fetching internships');
    }
  }

  async getInternshipById(id: number) {
    try {
      const internship = await this.prisma.internship.findUnique({
        where: { id },
      });

      if (!internship) {
        throw new Error('Internship not found');
      }

      return internship;
    } catch (error) {
      throw new Error('Error fetching internship');
    }
  }
}
