import { Message as PrismaMessage } from '@prisma/client';
import { MessageEntity } from '../entities/message.entity';
import { MessageResponseDto } from '../dto/message-response.dto';
import { plainToInstance } from 'class-transformer';

export class MessageMapper {
  static toEntity(this: void, prismaMessage: PrismaMessage): MessageEntity {
    const { id, username, content, createdAt } = prismaMessage;
    return { id, username, content, createdAt };
  }

  static toDto(this: void, entity: MessageEntity): MessageResponseDto {
    return plainToInstance<MessageResponseDto, MessageEntity>(
      MessageResponseDto,
      entity,
      { excludeExtraneousValues: true },
    );
  }

  static toDtoList(
    this: void,
    entities: MessageEntity[],
  ): MessageResponseDto[] {
    return plainToInstance<MessageResponseDto, MessageEntity>(
      MessageResponseDto,
      entities,
      { excludeExtraneousValues: true },
    );
  }
}
