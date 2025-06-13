import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { CreateMessageUseCase } from './use-cases/create-message.use-case';
import { MessageRepository } from './repositories/message.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    ChatGateway,
    CreateMessageUseCase,
    MessageRepository,
    PrismaService,
  ],
})
export class ChatModule {}
