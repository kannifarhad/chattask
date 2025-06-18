import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/authenticated-socket';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  generateToken(username: string) {
    return this.jwt.sign({ username });
  }

  verifyToken(token: string): JwtPayload {
    return this.jwt.verify(token);
  }
}
