import { Body, Controller, Get, HttpService, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka-options.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTransactionDto } from './dto';

@Controller()
export class AppController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka',
        brokers: ['kafka:39092'],
      },
    }
  })
  client: ClientKafka;

  producer: Producer;

  constructor(
    private httpService: HttpService
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('transactions');
    this.producer = await this.client.connect();
  }

  @Get()
  async getHello(): Promise<any> {
    const info = await this.httpService.post('http://ksql-server:8088/ksql', {
      ksql: 'LIST STREAMS;',
    }, {
      headers: {
        'Content-Type': 'application/vnd.ksql.v1+json'
      }
    }).toPromise();
    return 'Beep';
  }

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    this.producer.send({
      topic: 'transactions',
      messages: [{
        key: uuidv4(),
        value: JSON.stringify(createTransactionDto),
      }]
    });
    return {
      message: 'ok',
    }
  }
}
