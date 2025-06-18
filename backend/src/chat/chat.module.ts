import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageRepository } from './repositories/message.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChatGateway, MessageRepository, PrismaService, ChatService],
  controllers: [ChatController],
  imports: [AuthModule],
})
export class ChatModule {}
