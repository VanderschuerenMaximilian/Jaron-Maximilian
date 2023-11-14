import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: ['http://localhost:5173','https://218c-2001-6a8-2480-6dba-e5c0-e4fa-102-f0ef.ngrok-free.app'],
      credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();
