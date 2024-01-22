import { CreateUserDto } from "./create-user.dto";
export declare class UpdateUserDto extends CreateUserDto {
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
}
