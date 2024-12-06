import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import * as bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string; role: string }) {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      return this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword, // Use the hashed password
          role: data.role,
        },
      });
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async getAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }
}
