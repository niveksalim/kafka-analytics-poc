import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   @WebSocketServer() server: Server;

   afterInit(server: Server) {
    console.log('Init');
   }
  
   handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
   }
  
   handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected:: ${client.id}`);
   }

  sendAuthorizedEvent(data) {
    this.server.emit('authorized-event', {
        key: data.key,
        value: data.value,
    });
  }
}
