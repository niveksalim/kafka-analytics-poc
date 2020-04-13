import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  @Client({
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
  })
  client: ClientKafka;

  constructor(private readonly appService: AppService, private appGateway: AppGateway) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('TRANSACTION_AUTHORIZED_EVENTS')
  onTransactionAuthorized(@Payload() data) {
    this.appGateway.sendAuthorizedEvent(data);
  }
}
