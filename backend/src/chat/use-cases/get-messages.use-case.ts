import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';

@Injectable()
export class GetMessagesUseCase {
  constructor(private readonly repo: MessageRepository) {}

  execute() {
    return this.repo.findAll();
  }
}
