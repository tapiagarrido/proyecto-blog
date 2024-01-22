"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const posts_schema_1 = require("./schemas/posts.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const permissions_1 = require("../auth/interfaces/permissions");
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(createPostDto) {
        try {
            const newPost = await this.postModel.create(createPostDto);
            return newPost;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo ha salido mal");
        }
    }
    async getPosts(skip = 0, limit = 10) {
        try {
            const postsList = this.postModel.find({}, "-__v -_id").skip(skip).limit(limit);
            return postsList;
        }
        catch (error) {
            throw new common_1.BadRequestException("No se encuentran resultados");
        }
    }
    async getPost(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId)
            throw new common_1.BadRequestException("El ID ingresado no es valido");
        try {
            const post = await this.postModel.findById(id);
            if (!post)
                throw new common_1.NotFoundException("No existe registro con el ID ingresado");
            return post;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo no ha salido bien");
        }
    }
    async getPostsById(userId) {
        try {
            const postsListByUSerId = await this.postModel.find({ author: userId });
            return postsListByUSerId;
        }
        catch (error) {
            throw new common_1.BadRequestException("No se encuentran resultados");
        }
    }
    async updatePost(id, updatePostDto, req) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId)
            throw new common_1.BadRequestException("El ID ingresado no es valido");
        try {
            const { _id, role } = req.user;
            if (_id.toString() !== id && role !== permissions_1.Permissions.ADMINISTRATOR)
                throw new common_1.UnauthorizedException("Usted no puede editar información de otros usuarios");
            const updatedPost = this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
            return updatedPost;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo ha salido mal", error);
        }
    }
    async remove(id, req) {
        const { _id: currentUserId, role } = req.user;
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId)
            throw new common_1.BadRequestException("El ID ingresado no es valido");
        const postFind = await this.getPost(id);
        if (!postFind)
            throw new common_1.NotFoundException("No se encuentra un registro con el ID ingresado");
        if (postFind.author.toString() !== currentUserId.toString() && role !== permissions_1.Permissions.ADMINISTRATOR)
            throw new common_1.BadRequestException("No puedes eliminar post de otros usuarios");
        try {
            const deletedPost = await this.postModel.findByIdAndDelete(id);
            return deletedPost.value;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo ha salido mal", error);
        }
    }
    async getPostsBySearch(skip = 0, limit = 10, search) {
        const query = {
            $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { content: { $regex: new RegExp(search, 'i') } },
            ],
        };
        try {
            const postsFind = await this.postModel.find(query).skip(skip).limit(limit);
            return postsFind;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo ha salido mal", error);
        }
    }
    async getPostsByFilter(skip = 0, limit = 10, filter) {
        try {
            console.log(filter);
            const postsFind = await this.postModel.find(filter).skip(skip).limit(limit);
            return postsFind;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo ha salido mal", error);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map