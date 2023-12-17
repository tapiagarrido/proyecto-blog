import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { UserRolGuard } from "../guards/user-rol.guard";
import { ProtectionLevel } from "./protection-level.decorator";
import { Permissions } from "../interfaces/permissions";


export function Auth(permissions?:Permissions){
    
    return applyDecorators(
        ProtectionLevel(permissions),
        UseGuards( AuthGuard, UserRolGuard)
    )

}