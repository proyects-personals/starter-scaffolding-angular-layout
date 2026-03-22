import { RoleEnum } from '@/app';

/**
 * Convierte un string a RoleEnum.
 * Si no coincide, retorna un valor por defecto (ESTUDIANTES).
 */
export const mapRoleStringToEnum = (role: string | undefined): RoleEnum => {
  switch (role) {
    case 'ADMIN':
      return RoleEnum.ADMIN;
    case 'DOCENTES':
      return RoleEnum.DOCENTES;
    case 'ESTUDIANTES':
      return RoleEnum.ESTUDIANTES;
    default:
      return RoleEnum.ESTUDIANTES;
  }
};
