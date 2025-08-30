import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/User';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: "Create user" })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDTO) { 
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: "Get all users" })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesGuard, JwtAuthGuard)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: "Assign a role" })
    @ApiResponse({ status: 200 })
    @Post("/role")
    @Roles("ADMIN")
    @UseGuards(RolesGuard, JwtAuthGuard)
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: "Ban user" })
    @ApiResponse({ status: 200 })
    @Post("/ban")
    @Roles("ADMIN")
    @UseGuards(RolesGuard, JwtAuthGuard)
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
