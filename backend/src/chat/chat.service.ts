import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { CreateMessageUseCase } from './use-cases/create-message.use-case';
import { GetMessagesUseCase } from './use-cases/get-messages.use-case';
import { MessageMapper } from './mappers/message.mapper';

@Injectable()
export class ChatService {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
  ) {}

  async createMessage(dto: CreateMessageDto): Promise<MessageResponseDto> {
    const message = await this.createMessageUseCase.execute(dto);
    return MessageMapper.toDto(message);
  }

  async getMessages(): Promise<MessageResponseDto[]> {
    const messages = await this.getMessagesUseCase.execute();
    return messages.map((toMessageResponseDto) =>
      MessageMapper.toDto(toMessageResponseDto),
    );
  }
}
