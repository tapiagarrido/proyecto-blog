import { Permissions } from "../interfaces/permissions";
export declare function Auth(permissions?: Permissions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
