import type { RoleEnum } from '@/app';

export class UserModel {
  constructor(
    public email: string,
    public emailVerified: boolean,
    public nombre: string,
    public apellido: string,
    public role: RoleEnum,
    public telefono: string,
    public id: string,
  ) {}
}
