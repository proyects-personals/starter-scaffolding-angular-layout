import type { SignInResponseEntity } from '@/app/domain';
import { SignInModel } from '@/app/domain';

/**
 * @class SignInMapper
 * @version 1.1.0
 * @description
 * Mapper encargado de transformar la respuesta de infraestructura
 * en un modelo de dominio consistente.
 */
export class SignInMapper {
  /**
   * @method toModel
   * @description Convierte SignInResponseEntity en SignInModel.
   * @param {SignInResponseEntity} response Respuesta de autenticacion.
   * @returns {SignInModel} Modelo de dominio transformado.
   */
  public toModel(response: SignInResponseEntity): SignInModel {
    return new SignInModel(
      response.success,
      response.SignInOutput.nextStep?.signInStep ?? null,
      response.SignInOutput,
    );
  }
}
