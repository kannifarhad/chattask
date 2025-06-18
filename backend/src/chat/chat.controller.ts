import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageEntity } from './entities/message.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('messages')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ type: [MessageEntity] })
  async getMessages(
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ): Promise<MessageEntity[]> {
    return this.chatService.getMessages(pagination);
  }
}
