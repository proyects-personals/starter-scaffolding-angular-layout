import type { RoleEnum } from '@/app/domain';

export interface SignUpParametersEntity {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  role: RoleEnum;
  cedula: string;
  terminos: number;
}
