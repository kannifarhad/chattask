import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  username: string;

  @IsString()
  content: string;
}
