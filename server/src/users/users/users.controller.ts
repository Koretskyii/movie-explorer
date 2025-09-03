import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Post()
    create() {
        return this.usersService.create({ id: '1', name: 'John Doe', email: 'john.doe@example.com' });
    }

    @Get('/i/:id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Get('info')
    getInfo() {
        return process.env.DATABASE_URL;
    }
}
