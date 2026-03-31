import { Request } from 'express';

export interface JwtPayload {
  email: string;
  sub: string;
}

export interface UserPayload {
  sub: string;
  email: string;
  name?: string;
}

export interface RequestWithUser extends Request {
  user: UserPayload;
}
