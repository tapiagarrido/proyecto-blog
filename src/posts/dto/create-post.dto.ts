import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsOptional()
    category: string;

    @IsNotEmpty()
    user: User;
    
}
