import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({ example: "user@gmail.com", description: "User email" })
    @IsEmail({}, { message: "Invalid email" })
    @IsString({ message: "Must be a string" })
    readonly email: string;

    @ApiProperty({ example: "password123", description: "User password" })
    @Length(4, 16, { message: "Min length is 4, max is 16" })
    @IsString({ message: "Must be a string" })
    readonly password: string;

    @ApiProperty({ example: "Jane", description: "User name" })
    @IsString({ message: "Must be a string" })
    readonly name: string;
}