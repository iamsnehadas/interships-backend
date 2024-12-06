import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { InternshipService } from './internship/internship.service';
import { ApplicationService } from './application/application.service';
import { InternshipController } from './internship/internship.controller';
import { ApplicationController } from './application/application.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController, InternshipController, ApplicationController],
  providers: [AppService, InternshipService, ApplicationService],
})
export class AppModule {}
