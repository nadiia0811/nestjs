import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { User } from 'src/entity/User';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    
    async login(userDto: CreateUserDTO) {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
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

    private async generateToken(user: User) {
      const payload = { email: user.email, id: user.id, roles: user.roles };
      return {
        token: this.jwtService.sign(payload)
      }
    }

    private async validateUser(userDto: CreateUserDTO) {
      const user = await this.usersService.getUserByEmail(userDto.email);
      if(user) {
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(passwordEquals) {
          return user;
        }
      }
      throw new UnauthorizedException({message: "Incorrect email or password"});
    }
}
