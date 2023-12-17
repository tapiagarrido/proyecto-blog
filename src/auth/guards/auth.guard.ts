import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService: JwtService, private authService: AuthService){}

    async canActivate(context: ExecutionContext):Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException("No existe un usuario valido")
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_PASSWORD
                }
            )
            const user = await this.authService.getUser(payload.id);
            if(!user) throw new UnauthorizedException("Usuario no existe");
            request["user"] = user;
        } catch (error) {
            throw new UnauthorizedException("No tienes autorizacion");
        }

        return true;
    }

    private extractTokenFromHeader(request:Request): string | undefined {
        const control = request.headers["authorization"]?.split(" ") ?? [];
        const type = control[0];
        const token = control[1];
        return type === "Bearer" ? token : undefined;
    }

}
