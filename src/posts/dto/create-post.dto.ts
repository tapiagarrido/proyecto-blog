import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreatePostDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    author: User;
    
}
