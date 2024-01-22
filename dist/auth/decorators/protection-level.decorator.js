"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectionLevel = exports.META_ROLES = void 0;
const common_1 = require("@nestjs/common");
exports.META_ROLES = 'rol';
const ProtectionLevel = (permissions) => {
    return (0, common_1.SetMetadata)(exports.META_ROLES, permissions);
};
exports.ProtectionLevel = ProtectionLevel;
//# sourceMappingURL=protection-level.decorator.js.map