import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthResponseDto } from './dto/authResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: AuthResponseDto })
  login(@Body() dto: AuthDto): AuthResponseDto {
    const token = this.authService.generateToken(dto.username);
    return { token };
  }
}
