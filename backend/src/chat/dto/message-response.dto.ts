import { Expose } from 'class-transformer';

export class MessageResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;
}
