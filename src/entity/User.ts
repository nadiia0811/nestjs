import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "Unique identifier"})
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ApiProperty({ example: "Jane", description: "User name" })
  @Column({ type: "varchar", nullable: false, length: 100, default: "Anonymous" })
  name: string;

  @ApiProperty({ example: "user@gmail.com", description: "User email" })
  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: "password123", description: "User password" })
  @Column({ type: "varchar", nullable: false })
  password: string;

  @ApiProperty({ example: false, description: "Is user banned?" })
  @Column({ type: "boolean", default: false })
  banned: boolean;

  @ApiProperty({ example: "Spamming", description: "Reason for banning" })
  @Column({ type: "varchar", nullable: true })
  banReason: string;
  
  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;
}