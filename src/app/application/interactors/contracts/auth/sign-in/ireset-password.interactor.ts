import type { Observable } from 'rxjs';
import type { ResetPasswordModel } from '@/app/domain';
import type { ResetPasswordInput } from 'aws-amplify/auth';

/**
 * @class IResetPasswordInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para recuperacion de contrasena.
 */
export abstract class IResetPasswordInteractor {
  /**
   * @method resendCode
   * @description Ejecuta el reenvio del codigo.
   * @param {ResetPasswordInput} params Datos de entrada.
   * @returns {Observable<ResetPasswordModel>}
   */
  abstract resendCode(params: ResetPasswordInput): Observable<ResetPasswordModel>;
}
