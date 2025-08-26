import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/Role';
import { RoleDTO } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>){}

    async createRole(dtoRole: RoleDTO){
      const role = this.rolesRepository.create(dtoRole);
      await this.rolesRepository.save(role);
      return role;
    }

    async getRoleByValue(value: string) {
      const role = this.rolesRepository.findOne({ where: { value }});
      return role;
    }
}
