import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User";

@Entity()
export class Role {

  @PrimaryGeneratedColumn({ type: "int" })
  @ApiProperty({ example: 1, description: "Unique identifier"})
  id: number;

  @ApiProperty({ example: "ADMIN", description: "Role name" })
  @Column({ type: "varchar", nullable: false, unique: true })
  value: string;

  @ApiProperty({ example: "Administrator", description: "Role description" })
  @Column({ type: "varchar", nullable: false })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}