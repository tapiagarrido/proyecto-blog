import { CreateUserDto } from "./create-user.dto";
export declare class RegisterUserDto extends CreateUserDto {
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
}
