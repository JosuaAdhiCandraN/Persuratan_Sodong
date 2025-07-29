import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe)
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  await app.listen(process.env.PORT ?? 5000);
  console.log(`NestJS server running on port ${process.env.PORT ?? 5000}`);
  console.log(`CORS allowed for: ${process.env.CORS_ORIGIN ?? '*'}`);

}
bootstrap();
