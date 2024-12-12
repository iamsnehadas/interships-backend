import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'https://interships-frontend.vercel.app/',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
