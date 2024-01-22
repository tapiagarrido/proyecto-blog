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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const protection_level_decorator_1 = require("../decorators/protection-level.decorator");
const permissions_1 = require("../interfaces/permissions");
let UserRolGuard = class UserRolGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const userRol = this.reflector.get(protection_level_decorator_1.META_ROLES, context.getHandler());
        if (!userRol)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user)
            throw new common_1.BadRequestException("Usuario no encontrado");
        if (user.role.includes(permissions_1.Permissions.ADMINISTRATOR))
            return true;
        if (userRol.includes(user.role))
            return true;
        throw new common_1.ForbiddenException(`Usuario ${user.name} no tiene permisos suficientes`);
    }
};
exports.UserRolGuard = UserRolGuard;
exports.UserRolGuard = UserRolGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], UserRolGuard);
//# sourceMappingURL=user-rol.guard.js.map