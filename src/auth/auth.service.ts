import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { email: string; password: string; name: string; role: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      return this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already in use');
      }
      console.error('Error during registration:', error);
      throw new Error('Registration failed');
    }
  }

  async login(email: string, password: string): Promise<{
    accessToken: string;
    user: { id: number; email: string; role: string };
  }> {
    // Fetch user from the database
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Check if user exists and password is valid
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // Return the token and user details
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
