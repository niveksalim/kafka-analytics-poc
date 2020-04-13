import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TRANSACTION_KAFKA } from './constants';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([{ name: TRANSACTION_KAFKA, transport: Transport.KAFKA }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
