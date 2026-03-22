import type { UserEntity } from '@/app/domain';
import { UserModel } from '@/app/domain';

/**
 * @class GetUserMapper
 * @version 1.0.0
 * @description
 * Mapper encargado de transformar UserEntity en UserModel.
 */
export class GetUserMapper {
  /**
   * @method toModel
   * @description Convierte UserEntity en UserModel.
   * @param {UserEntity} entity Entidad del usuario.
   * @returns {UserModel} Modelo de dominio.
   */
  public toModel(entity: UserEntity): UserModel {
    return new UserModel(
      entity.email,
      entity.email_verified,
      entity.nombre,
      entity.apellido,
      entity.role,
      entity.telefono,
      entity.sub,
    );
  }
}
