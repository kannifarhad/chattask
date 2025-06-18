import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Set to true for development; in production, you should handle expiration properly
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: { sub: number; username: string }) {
    // Here you can add additional validation logic if needed in a real application.
    // For example, you can check if the user exists in the database
    return payload.username;
  }
}
