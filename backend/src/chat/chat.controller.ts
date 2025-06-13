import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('messages')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  getMessages() {
    return this.chatService.getMessages();
  }
}
