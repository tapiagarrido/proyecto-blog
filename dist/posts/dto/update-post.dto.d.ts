import { CreatePostDto } from './create-post.dto';
import { User } from '../../auth/schemas/user.schema';
declare const UpdatePostDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    title: string;
    content: string;
    category: string;
    author: User;
}
export {};
