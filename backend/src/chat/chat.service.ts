import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { MessageMapper } from './mappers/message.mapper';
import { MessageRepository } from './repositories/message.repository';

@Injectable()
export class ChatService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async createMessage(dto: CreateMessageDto): Promise<MessageResponseDto> {
    const message = await this.messageRepository.create(dto);
    return MessageMapper.toDto(message);
  }

  async getMessages({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<MessageResponseDto[]> {
    const skip = (page - 1) * limit;
    const messages = await this.messageRepository.findMany({
      skip,
      take: limit,
    });

    return messages.map(MessageMapper.toDto);
  }
}
