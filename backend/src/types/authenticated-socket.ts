import { Socket } from 'socket.io';

export interface JwtPayload {
  sub: string;
  username: string;
  // add other fields from your JWT
}

// Extend socket to include your expected `.data.user`
export interface AuthenticatedSocket extends Socket {
  handshake: Socket['handshake'] & {
    auth: {
      token: string;
    };
  };
  data: {
    user: JwtPayload;
  };
}
