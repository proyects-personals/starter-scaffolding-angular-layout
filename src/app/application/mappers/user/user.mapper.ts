import type { SignUpParametersEntity } from '@/app/domain';
import { CreateUserEntity } from '@/app/domain';

/**
 * @class UserMapper
 * @version 1.1.0
 * @description
 * Mapper encargado de transformar parametros del dominio
 * a entidades persistibles.
 */
export class UserMapper {
  /**
   * @method toCreateEntity
   * @description Convierte parametros de registro en entidad de persistencia.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @returns {CreateUserEntity} Entidad lista para persistir.
   */
  public toCreateEntity(params: SignUpParametersEntity): CreateUserEntity {
    return new CreateUserEntity({
      nombre: params.nombres,
      apellidos: params.apellidos,
      cedula: params.cedula ?? '',
      celular: params.telefono,
      correo: params.email,
      role: params.role,
    });
  }
}
