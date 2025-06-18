import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { MessageMapper } from '../mappers/message.mapper';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto): Promise<MessageEntity> {
    const saved = await this.prisma.message.create({ data: dto });
    return MessageMapper.toEntity(saved);
  }

  async findMany({
    skip,
    take,
  }: {
    skip: number;
    take: number;
  }): Promise<MessageEntity[]> {
    const result = await this.prisma.message.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return result.map(MessageMapper.toEntity);
  }
}
