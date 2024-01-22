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
exports.AdminsController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const auth_service_1 = require("../auth/auth.service");
const posts_service_1 = require("../posts/posts.service");
const permissions_1 = require("../auth/interfaces/permissions");
const swagger_1 = require("@nestjs/swagger");
let AdminsController = class AdminsController {
    constructor(postsService, usersService) {
        this.postsService = postsService;
        this.usersService = usersService;
    }
    getAllUsersAdmin() {
        return this.usersService.getUsers();
    }
    getAllPostAdmin() {
        return this.postsService.getPosts();
    }
    remove(userId) {
        return this.usersService.deleteUser(userId);
    }
};
exports.AdminsController = AdminsController;
__decorate([
    (0, common_1.Get)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "getAllUsersAdmin", null);
__decorate([
    (0, common_1.Get)('posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "getAllPostAdmin", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: "userId"
    }),
    (0, common_1.Delete)('users/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "remove", null);
exports.AdminsController = AdminsController = __decorate([
    (0, swagger_1.ApiTags)("Admins"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.Auth)(permissions_1.Permissions.ADMINISTRATOR),
    (0, common_1.Controller)('admins'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        auth_service_1.AuthService])
], AdminsController);
//# sourceMappingURL=admins.controller.js.map