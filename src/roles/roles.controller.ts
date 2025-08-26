import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDTO } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService){}

  @Post()
  create(@Body() roleDto: RoleDTO) {
    return this.rolesService.createRole(roleDto);
  }

  @Get("/:value")
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
