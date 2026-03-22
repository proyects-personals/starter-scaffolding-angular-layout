import type { ResetPasswordOutput } from 'aws-amplify/auth';
import { ResetPasswordModel } from '@/app/domain';

/**
 * @class ResetPasswordMapper
 * @version 1.1.0
 * @description
 * Mapper encargado de transformar la respuesta de AWS Amplify
 * en un modelo de dominio.
 */
export class ResetPasswordMapper {
  /**
   * @method toModel
   * @description Convierte ResetPasswordOutput en ResetPasswordModel.
   * @param {ResetPasswordOutput} response Respuesta de AWS.
   * @returns {ResetPasswordModel} Modelo de dominio.
   */
  public toModel(response: ResetPasswordOutput): ResetPasswordModel {
    return new ResetPasswordModel(
      response.nextStep?.resetPasswordStep ?? null,
      response.nextStep?.codeDeliveryDetails ?? null,
      response.isPasswordReset,
      response,
    );
  }
}
