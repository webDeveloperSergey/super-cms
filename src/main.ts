import { NestFactory } from '@nestjs/core';
import * as cookyParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookyParser());

  app.enableCors({
    origin: [process.env.CLIENT_URL], // Определяет, с каких доменов разрешены запросы к вашему API
    credentials: true, // Разрешает отправку cookies, токенов авторизации и других учетных данных в cross-origin запросах
    exposedHeaders: 'set-cookie', // Указывает, какие заголовки ответа будут доступны JavaScript коду на фронтенде
  });

  await app.listen(process.env.SERVER_PORT ?? 5000);
}
bootstrap();
