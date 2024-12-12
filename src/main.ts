import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'https://vercel.com/snehas-projects-93637d62/interships-frontend/6df7Pc9njH9kc7H6dfCckQ31p7SC',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
