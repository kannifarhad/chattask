import { Message as PrismaMessage } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity implements PrismaMessage {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
}
