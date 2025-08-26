import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from 'src/entity/Role';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role])]
})
export class RolesModule {}
