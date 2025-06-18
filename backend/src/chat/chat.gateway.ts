import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { WsAuthGuard } from '../auth/guard/ws-auth.guard';
import { AuthenticatedSocket } from '../types/authenticated-socket';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: { origin: '*' } })
@UseGuards(WsAuthGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Track connected users: socket.id -> username
  private connectedUsers = new Map<string, string>();
  private typingUsers = new Set<string>();

  constructor(
    private chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  handleConnection(client: AuthenticatedSocket) {
    const token = client.handshake.auth?.token;

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload = this.authService.verifyToken(token);
      client.data.user = payload;

      // Store user
      this.connectedUsers.set(client.id, payload.username);

      const message = {
        id: client.id,
        content: `${payload.username} joined the chat`,
        username: 'system',
        createdAt: new Date(),
      };

      this.server.emit('message', message);
      this.server.emit('users', Array.from(this.connectedUsers.values()));
    } catch (err) {
      console.warn('Invalid token. Disconnecting client:', client.id, err);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    const username = this.connectedUsers.get(client.id);

    if (username) {
      this.connectedUsers.delete(client.id);

      const message = {
        id: client.id,
        content: `${username} left the chat`,
        username: 'system',
        createdAt: new Date(),
      };

      this.server.emit('message', message);
      this.server.emit('users', Array.from(this.connectedUsers.values()));

      if (this.typingUsers.has(username)) {
        this.typingUsers.delete(username);
        this.server.emit('typing-users', Array.from(this.typingUsers));
      }
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() dto: string,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const username = client.data.user.username;

    const saved = await this.chatService.createMessage({
      content: dto,
      username,
    });

    this.server.emit('message', saved);
  }

  @SubscribeMessage('users')
  handleGetUsers(@ConnectedSocket() client: AuthenticatedSocket) {
    const users = Array.from(this.connectedUsers.values());
    client.emit('users', users);
  }

  @SubscribeMessage('typing')
  handleTyping(@ConnectedSocket() client: AuthenticatedSocket) {
    const username = client.data.user.username;
    this.typingUsers.add(username);
    // Emit updated list to all except the sender
    client.broadcast.emit('typing-users', Array.from(this.typingUsers));
  }

  @SubscribeMessage('stop-typing')
  handleStopTyping(@ConnectedSocket() client: AuthenticatedSocket) {
    const username = client.data.user.username;
    this.typingUsers.delete(username);

    // Emit updated list to all except the sender
    client.broadcast.emit('typing-users', Array.from(this.typingUsers));
  }

  @SubscribeMessage('typing-users')
  handleTypingUsers(@ConnectedSocket() client: AuthenticatedSocket) {
    // Send current typing users to the requester only
    client.emit('typing-users', Array.from(this.typingUsers));
  }
}
