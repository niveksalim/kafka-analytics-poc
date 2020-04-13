import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka',
        brokers: ['kafka:39092'],
      },
      consumer: {
        groupId: 'kafka-consumer'
      }
    }
  });

  app.enableCors({
      "origin": "http://localhost:4200",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,
      "credentials":true
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}
bootstrap();
