import type { RoleEnum } from '@/app/domain';

export class UserEntity {
  constructor(
    public email: string,
    public email_verified: boolean,
    public nombre: string,
    public apellido: string,
    public role: RoleEnum,
    public telefono: string,
    public sub: string,
  ) {}
}
