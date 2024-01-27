/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { UserRequest } from '../auth/interfaces/user-request';
import { filterPosts } from './interfaces/search.interfaces';
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<Post>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    getPosts(skip?: number, limit?: number): Promise<Post[]>;
    getPost(id: string): Promise<Post>;
    getPostsById(userId: string): Promise<Post[]>;
    updatePost(id: string, updatePostDto: UpdatePostDto, req: any): Promise<Post>;
    remove(id: string, req: UserRequest): Promise<Post>;
    getPostsBySearch(skip: number, limit: number, search: string): Promise<Post[]>;
    getPostsByFilter(skip: number, limit: number, filter: filterPosts): Promise<Post[]>;
}
