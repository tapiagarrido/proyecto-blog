"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const user_rol_guard_1 = require("../guards/user-rol.guard");
const protection_level_decorator_1 = require("./protection-level.decorator");
function Auth(permissions) {
    return (0, common_1.applyDecorators)((0, protection_level_decorator_1.ProtectionLevel)(permissions), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, user_rol_guard_1.UserRolGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map