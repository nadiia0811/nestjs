import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDTO) { 
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
