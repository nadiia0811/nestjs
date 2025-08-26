import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({ example: "user@gmail.com", description: "User email" })
    readonly email: string;

    @ApiProperty({ example: "password123", description: "User password" })
    readonly password: string;

    @ApiProperty({ example: "Jane", description: "User name" })
    readonly name: string;
}