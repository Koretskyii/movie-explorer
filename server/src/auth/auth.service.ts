import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from 'src/users/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configServise: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    return await this.usersService.create({ email: dto.email, password: hash });
  }

  async login(user: any): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configServise.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configServise.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      })
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async validateJWT(payload: any) {
    return await this.usersService.findById(payload.sub);
  }

  refreshToken(user: any) {
    const payload = { email: user.email, sub: user.sub };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configServise.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
    };
  }
}
