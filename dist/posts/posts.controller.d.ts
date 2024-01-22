import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { UserRequest } from 'src/auth/interfaces/user-request';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, req: any): Promise<import("./schemas/posts.schema").Post>;
    getPosts(skip: number, limit: number): Promise<import("./schemas/posts.schema").Post[]>;
    getPostBySearch(skip: number, limit: number, search: string): Promise<import("./schemas/posts.schema").Post[]>;
    getPostByFilter(skip: number, limit: number, author: string, category: string): Promise<import("./schemas/posts.schema").Post[]>;
    getPost(postId: string): Promise<import("./schemas/posts.schema").Post>;
    getPostsById(userId: string): Promise<import("./schemas/posts.schema").Post[]>;
    updatePost(postId: string, updatePostDto: UpdatePostDto, req: Request): Promise<import("./schemas/posts.schema").Post>;
    remove(postId: string, req: UserRequest): Promise<import("./schemas/posts.schema").Post>;
}
