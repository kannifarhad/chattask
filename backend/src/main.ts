import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      // origin: 'http://localhost:3000',
      origin: '*',
      credentials: true,
    },
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Setup API Documentation
  const options = new DocumentBuilder()
    .setTitle('Sinch Chat')
    .setDescription('Chat created using Nest.js and Websockets')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //Setup loggers
  app.useLogger(app.get(Logger));

  await app.listen(9000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
