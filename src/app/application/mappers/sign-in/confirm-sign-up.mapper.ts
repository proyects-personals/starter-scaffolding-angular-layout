import type { ConfirmSignUpOutput } from 'aws-amplify/auth';
import { ConfirmSignUpModel } from '@/app/domain';

/**
 * @class ConfirmSignUpMapper
 * @version 1.2.0
 * @description
 * Mapper encargado de transformar la respuesta de AWS Amplify
 * en un modelo de dominio consistente.
 */
export class ConfirmSignUpMapper {
  /**
   * @method toModel
   * @description Convierte ConfirmSignUpOutput en ConfirmSignUpModel.
   * @param {ConfirmSignUpOutput} response Respuesta de AWS Amplify.
   * @returns {ConfirmSignUpModel} Modelo de dominio transformado.
   */
  public toModel(response: ConfirmSignUpOutput): ConfirmSignUpModel {
    return new ConfirmSignUpModel(
      true,
      response.nextStep?.signUpStep ?? null,
      response.isSignUpComplete,
      response.userId ?? null,
    );
  }
}
