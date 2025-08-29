import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
    private rolesService: RolesService) { }

  async createUser(dtoUser: CreateUserDTO) {
    const user = this.userRepo.create(dtoUser);
    const role = await this.rolesService.getRoleByValue("USER");
    user.roles = [role!];
    await this.userRepo.save(user);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepo.find();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email }, relations: { roles: true } });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
      relations: { roles: true }
    });

    if (!user) {
      throw new NotFoundException(`User with id ${dto.userId} not found`);
    }

    const role = await this.rolesService.getRoleByValue(dto.value);

    if (!role) {
      throw new NotFoundException(`Role with value ${dto.value} not found`);
    }

    if (user && role) {
      const hasRole = user.roles.find(r => r.value === role.value);
      if (!hasRole) {
        user.roles.push(role);
        return await this.userRepo.save(user);
      }
    }
  }

  async ban(dto: BanUserDto) {
    return false;
  }
}
