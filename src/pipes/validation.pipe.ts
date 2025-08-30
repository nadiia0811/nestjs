import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { ValidationException } from "src/exception/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(CreateUserDTO, value);
        const errors = await validate(obj);

        if (errors.length) {
            let messages = errors.map(err => {
                if (err.constraints) {
                    return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
                }
                return `${err.property} - invalid value`;
            });
            throw new ValidationException(messages);
        }
        return value;
    }
}