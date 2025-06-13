import { Message as PrismaMessage } from '@prisma/client';

export class Message implements PrismaMessage {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
}
