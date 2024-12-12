import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedApp; 

export default async (req, res) => {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'https://interships-frontend.vercel.app/',
      credentials: true,
    });

    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }

  return cachedApp(req, res);
};
