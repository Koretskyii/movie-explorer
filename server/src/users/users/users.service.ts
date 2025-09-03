import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(userData: { id: string, name: string, email: string }): Promise<string> {
        await this.prisma.user.create({ data: userData });
        return `User ${userData.id} created successfully!`;
    }
    findAll(): string {
        return 'This action returns all users';
    }
    findOne(id: string): string {
        return `This action returns user #${id}`;
    }
}