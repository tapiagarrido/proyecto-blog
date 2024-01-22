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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException("No existe un usuario valido");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_PASSWORD
            });
            const user = await this.authService.getUser(payload.id);
            if (!user)
                throw new common_1.UnauthorizedException("Usuario no existe");
            request["user"] = user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("No tienes autorizacion");
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const control = request.headers["authorization"]?.split(" ") ?? [];
        const type = control[0];
        const token = control[1];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, auth_service_1.AuthService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map