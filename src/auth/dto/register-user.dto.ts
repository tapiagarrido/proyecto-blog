import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class RegisterUserDto extends CreateUserDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname:string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password:string;
}