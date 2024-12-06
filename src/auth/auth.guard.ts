import { Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport'; // Using Passport.js

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {}
