import type { Observable } from 'rxjs';
import type { ResetPasswordInput, ResetPasswordOutput } from 'aws-amplify/auth';

/**
 * @class IResetPasswordAdapter
 * @version 1.0.0
 * @description
 * Interfaz para el adaptador encargado de reenviar el codigo de recuperacion de contrasena.
 * Define el contrato para la integracion con AWS Amplify.
 */
export abstract class IResetPasswordAdapter {
  /**
   * @method resendPassword
   * @description Envia nuevamente el codigo de recuperacion al usuario.
   * @param {ResetPasswordInput} params Contiene el username del usuario.
   * @returns {Observable<ResetPasswordOutput>} Flujo con la respuesta de AWS Amplify.
   */
  abstract resendPassword(params: ResetPasswordInput): Observable<ResetPasswordOutput>;
}
