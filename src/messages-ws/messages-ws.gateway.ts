import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';

import { MessagesWsService } from './messages-ws.service';
import { PayloadInterface } from 'src/auth/interfaces';
import { NewMessageDto } from './dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;
    let payload: PayloadInterface;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! Emitir al cliente que envio
    // client.emit('messages-from-server',
    //   {
    //     fullName: 'Yo',
    //     message: payload.message || 'No message!'
    //   }
    // )

    //!Emitir a todos los clientes MENOS cliente inicial
    // client.broadcast.emit('messages-from-server',
    //   {
    //     fullName: 'Yo',
    //     message: payload.message || 'No message!'
    //   }
    // )

    this.wss.emit('messages-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'No message!',
    });
  }
}
