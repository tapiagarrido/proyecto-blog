import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../schemas/user.schema";
import { META_ROLES } from "../decorators/protection-level.decorator";
import { Permissions } from "../interfaces/permissions";


@Injectable()
export class UserRolGuard implements CanActivate{

    constructor( private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // Obtener parametros para restringir
        const userRol: Permissions = this.reflector.get(META_ROLES, context.getHandler())
        
        // Si no hay parametros, es un edpoint para todo tipo de usuario
        if(!userRol) return true;
        const request = context.switchToHttp().getRequest();

        const user = request.user as User;
        if(!user) throw new BadRequestException("Usuario no encontrado");

        // Si el endpoint es solo para el usuario autor, se comparan los id; los admin pueden acceder de todas formas. 
        if(userRol.author){
            const {id: authorId} = request.params;
            if(user._id.toString() !== authorId.toString() && !user.isAdmin) throw new UnauthorizedException("No tienes autorización a ver otros usuarios");
            return true;
        }

        // Si el auth pide admin, se busca que el usuario sea admin y si no, se pasa a un error de autorizacion.
        if(user.isAdmin === userRol.admin) return true;

        throw new ForbiddenException(`Usuario ${ user.name } no tiene permisos suficientes`);
    }

}