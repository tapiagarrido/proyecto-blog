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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const swagger_1 = require("@nestjs/swagger");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    create(createPostDto, req) {
        createPostDto.author = req.user._id;
        return this.postsService.create(createPostDto);
    }
    getPosts(skip, limit) {
        return this.postsService.getPosts(skip, limit);
    }
    getPostBySearch(skip, limit, search) {
        return this.postsService.getPostsBySearch(skip, limit, search);
    }
    getPostByFilter(skip, limit, author, category) {
        if (author === undefined && category === undefined)
            throw new common_1.NotFoundException("Necesita especificar el parametro de busqueda");
        let searchFilter = {};
        if (author)
            searchFilter.author = author;
        if (category)
            searchFilter.category = category;
        return this.postsService.getPostsByFilter(skip, limit, searchFilter);
    }
    getPost(postId) {
        return this.postsService.getPost(postId);
    }
    getPostsById(userId) {
        return this.postsService.getPostsById(userId);
    }
    updatePost(postId, updatePostDto, req) {
        return this.postsService.updatePost(postId, updatePostDto, req);
    }
    remove(postId, req) {
        return this.postsService.remove(postId, req);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostBySearch", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("author")),
    __param(3, (0, common_1.Query)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostByFilter", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: "postId"
    }),
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: "userId"
    }),
    (0, common_1.Get)("/user/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostsById", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: "postId"
    }),
    (0, common_1.Put)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: "postId"
    }),
    (0, common_1.Delete)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)("Posts"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map