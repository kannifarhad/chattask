import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'JhonDoe',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z0-9_]+$',
    default: 'JhonDoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
