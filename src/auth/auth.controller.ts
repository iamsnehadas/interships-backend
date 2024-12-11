import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: { email: string; password: string; name: string; role: string }) {
    console.log('Register endpoint hit with data:', data);
    try {
      const user = await this.authService.register(data);
      return {
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Error during registration:', error.message);
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    console.log('Login endpoint hit with data:', data);
    try {
      const { accessToken, user } = await this.authService.login(data.email, data.password);

      return {
        accessToken,
        user,
      };
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new HttpException(
        error.message || 'Invalid credentials',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
