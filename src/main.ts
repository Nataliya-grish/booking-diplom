import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import configuration from './config/configuration';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const configService = app.get(configuration);
  const PORT = configService.get('HTTP_PORT');
  await app.listen(PORT);
}
bootstrap();