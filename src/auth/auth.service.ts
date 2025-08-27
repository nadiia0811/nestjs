import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { User } from 'src/entity/User';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    async login(userDto: CreateUserDTO) {

    }

    async registration(userDto: CreateUserDTO) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException("User with such email already exists", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    async generateToken(user: User) {
      const payload = { email: user.email, id: user.id, roles: user.roles };
      return {
        token: this.jwtService.sign(payload)
      }
    }
}
