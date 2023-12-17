import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'rol';


export const ProtectionLevel = (permissions) => {

    return SetMetadata( META_ROLES , permissions);
}
