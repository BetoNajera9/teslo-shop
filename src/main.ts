import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('TesloShopBoostrap')

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
  }))

  await app.listen(process.env.PORT, () => {
    logger.log(`App running on port ${process.env.PORT}`)
  });
}
bootstrap();
