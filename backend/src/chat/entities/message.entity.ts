import { Message as PrismaMessage } from '@prisma/client';

export class MessageEntity implements PrismaMessage {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
}
