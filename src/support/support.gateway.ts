import { UseFilters, UseGuards } from '@nestjs/common';
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from './support.service';
import { ID } from './dto/CreateSupportRequest.dto';
import { WsAuthGuard } from '../auth/guard/ws-auth.guard';
import { Roles, Role } from '../decorators/roles.decorator';
import { WsExceptionFilter } from './filter/ws.exeption.filter';
import { UsersService } from '../users/users.service';
import { WsValidationPipe } from '../validation/ws-validation.pipe';
import { WsRolesGuard } from '../auth/guard/ws-roles.guard';

@WebSocketGateway({
  cookie: true,
  cors: true,
})
export class SupportGateway {
  constructor(
    private supportRequestService: SupportRequestService,
    private usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseFilters(new WsExceptionFilter())
  @UseGuards(WsAuthGuard, WsRolesGuard)
  @Roles(Role.CLIENT, Role.MANAGER)
  @SubscribeMessage('connectToChat')
  async handleSubscribeToChat(
    @ConnectedSocket() client: Socket,
    @MessageBody(new WsValidationPipe()) payload: { chatId: ID },
  ) {
    return this.supportRequestService.subscribe(
      async (supportRequest, message) => {
        if (supportRequest._id === payload.chatId) {
          const { _id, sentAt, text, readAt, author } = message;
          const { id: authorId, name } =
            await this.usersService.findById(author);
          const result = {
            _id,
            sentAt,
            text,
            readAt,
            author: {
              id: authorId,
              name: name,
            },
          };
          client.emit('connectToChat', result);
        }
      },
    );
  }
}