import { User } from "../../auth/schemas/user.schema";
export declare class CreatePostDto {
    title: string;
    content: string;
    category: string;
    author: User;
}
