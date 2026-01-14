import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(registerDto: { email: string; password: string }) {
    return this.prisma.user.create({
      data: {
        name: 'User',
        email: registerDto.email,
        password: registerDto.password,
      },
    });
  }
}
