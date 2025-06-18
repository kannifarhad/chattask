/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';
import { mock } from 'jest-mock-extended';
import { AuthenticatedSocket } from '../types/authenticated-socket';
import { Server } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  const chatServiceMock = mock<ChatService>();
  const authServiceMock = mock<AuthService>();
  let serverEmitMock: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: ChatService, useValue: chatServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);

    serverEmitMock = jest.fn();
    gateway.server = { emit: serverEmitMock } as unknown as Server;
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('handleConnection', () => {
    it('should accept connection with valid token and emit join message', () => {
      const socket = {
        id: 'abc',
        handshake: { auth: { token: 'valid.token' } },
        data: {},
        disconnect: jest.fn(),
      } as unknown as AuthenticatedSocket;

      authServiceMock.verifyToken.mockReturnValue({
        username: 'John',
        sub: '23423',
      });

      gateway.handleConnection(socket);

      expect(socket.data.user).toEqual({ username: 'John', sub: '23423' });
      expect(serverEmitMock).toHaveBeenCalledWith(
        'message',
        expect.objectContaining({
          content: 'John joined the chat',
        }),
      );
      expect(serverEmitMock).toHaveBeenCalledWith('users', ['John']);
    });

    it('should disconnect client with invalid token', () => {
      const socket = {
        id: 'xyz',
        handshake: { auth: { token: 'bad.token' } },
        disconnect: jest.fn(),
      } as unknown as AuthenticatedSocket;

      authServiceMock.verifyToken.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      gateway.handleConnection(socket);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(socket.disconnect).toHaveBeenCalledWith(true);
      expect(console.warn).toHaveBeenCalledWith(
        'Invalid token. Disconnecting client:',
        'xyz',
        expect.any(Error),
      );
    });
  });

  describe('handleDisconnect', () => {
    it('should broadcast leave message and update users list', () => {
      gateway['connectedUsers'].set('abc', 'John');
      gateway['typingUsers'].add('John');

      const socket = { id: 'abc' } as unknown as AuthenticatedSocket;

      gateway.handleDisconnect(socket);

      expect(serverEmitMock).toHaveBeenCalledWith(
        'message',
        expect.objectContaining({
          content: 'John left the chat',
        }),
      );
      expect(serverEmitMock).toHaveBeenCalledWith('users', []);
      expect(serverEmitMock).toHaveBeenCalledWith('typing-users', []);
    });
  });

  describe('handleMessage', () => {
    it('should save and emit message', async () => {
      const savedMessage = {
        id: 1,
        content: 'Hello',
        username: 'John',
        createdAt: new Date(),
      };
      chatServiceMock.createMessage.mockResolvedValue(savedMessage);

      const socket = {
        data: { user: { username: 'John' } },
      } as unknown as AuthenticatedSocket;

      await gateway.handleMessage('Hello', socket);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(chatServiceMock.createMessage).toHaveBeenCalledWith({
        content: 'Hello',
        username: 'John',
      });

      expect(serverEmitMock).toHaveBeenCalledWith('message', savedMessage);
    });
  });

  describe('handleGetUsers', () => {
    it('should send list of connected users', () => {
      gateway['connectedUsers'].set('abc', 'John');
      const emitMock = jest.fn();

      const socket = { emit: emitMock } as unknown as AuthenticatedSocket;

      gateway.handleGetUsers(socket);

      expect(emitMock).toHaveBeenCalledWith('users', ['John']);
    });
  });

  describe('handleTyping / handleStopTyping', () => {
    it('should broadcast typing users', () => {
      const socket = {
        data: { user: { username: 'John' } },
        broadcast: { emit: jest.fn() },
      } as unknown as AuthenticatedSocket;

      gateway.handleTyping(socket);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(socket.broadcast.emit).toHaveBeenCalledWith('typing-users', [
        'John',
      ]);

      gateway.handleStopTyping(socket);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(socket.broadcast.emit).toHaveBeenCalledWith('typing-users', []);
    });
  });

  describe('handleTypingUsers', () => {
    it('should emit current typing users to requester', () => {
      gateway['typingUsers'].add('John');
      const socket = {
        emit: jest.fn(),
      } as unknown as AuthenticatedSocket;

      gateway.handleTypingUsers(socket);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(socket.emit).toHaveBeenCalledWith('typing-users', ['John']);
    });
  });
});
