import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    register(registerUserDto: RegisterUserDto): Promise<import("./interfaces/login-response").LoginResponse>;
    login(loginDto: LoginDto): Promise<import("./interfaces/login-response").LoginResponse>;
    findAllUsers(): Promise<import("./schemas/user.schema").User[]>;
    findUser(id: string): Promise<import("./schemas/user.schema").User>;
    updateUser(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<import("./schemas/user.schema").User>;
    deleteUser(id: string): Promise<import("./schemas/user.schema").User>;
}
