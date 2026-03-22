import type { ResendCodeEntity } from '@/app/domain';
import { ResendCodeModel } from '@/app/domain';

/**
 * @class ResendCodeMapper
 * @version 1.1.0
 * @description
 * Mapper encargado de transformar la entidad en modelo de dominio.
 */
export class ResendCodeMapper {
  /**
   * @method toModel
   * @description Convierte ResendCodeEntity en ResendCodeModel.
   * @param {ResendCodeEntity} entity Datos de infraestructura.
   * @returns {ResendCodeModel} Modelo de dominio.
   */
  public toModel(entity: ResendCodeEntity): ResendCodeModel {
    return new ResendCodeModel(
      entity.destination ?? null,
      entity.deliveryMedium ?? null,
      entity.attributeName ?? null,
    );
  }
}
