import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageMapper } from '../mappers/message.mapper';

@Injectable()
export class CreateMessageUseCase {
  constructor(private readonly repo: MessageRepository) {}

  async execute(dto: CreateMessageDto) {
    const saved = await this.repo.create(dto);
    return MessageMapper.toDto(saved);
  }
}
