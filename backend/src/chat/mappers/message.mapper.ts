import { Message as PrismaMessage } from '@prisma/client';
import { MessageEntity } from '../entities/message.entity';
import { MessageResponseDto } from '../dto/message-response.dto';
import { plainToInstance } from 'class-transformer';

export class MessageMapper {
  static toEntity(prismaMessage: PrismaMessage): MessageEntity {
    const { id, username, content, createdAt } = prismaMessage;
    return { id, username, content, createdAt };
  }

  static toDto(entity: MessageEntity): MessageResponseDto {
    return plainToInstance(MessageResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toDtoList(entities: MessageEntity[]): MessageResponseDto[] {
    return entities.map((e) => this.toDto(e));
  }
}
