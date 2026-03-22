import type { Observable } from 'rxjs';
import type { ResetPasswordInput } from 'aws-amplify/auth';
import type { ResetPasswordModel } from '@/app/domain';

/**
 * @class IResetPasswordRepository
 * @version 1.0.0
 * @description
 * Contrato para el repositorio de reenvio de codigo de contrasenia.
 */
export abstract class IResetPasswordRepository {
  /**
   * @method resend
   * @description Solicita el reenvio del codigo de recuperacion.
   * @param {ResetPasswordInput} params Datos del usuario.
   * @returns {Observable<ResetPasswordModel>} Flujo reactivo con el resultado.
   */
  abstract resend(params: ResetPasswordInput): Observable<ResetPasswordModel>;
}
