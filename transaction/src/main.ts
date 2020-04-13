import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka',
        brokers: ['kafka:39092'],
      },
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
