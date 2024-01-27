import { AuthService } from '../auth/auth.service';
import { PostsService } from '../posts/posts.service';
export declare class AdminsController {
    private readonly postsService;
    private readonly usersService;
    constructor(postsService: PostsService, usersService: AuthService);
    getAllUsersAdmin(): Promise<import("../auth/schemas/user.schema").User[]>;
    getAllPostAdmin(): Promise<import("../posts/schemas/posts.schema").Post[]>;
    remove(userId: string): Promise<import("../auth/schemas/user.schema").User>;
}
