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
   * @method resendPassword
   * @description Ejecuta el reenvio de la contraseña.
   * @param {ResetPasswordInput} params Datos de entrada.
   * @returns {Observable<ResetPasswordModel>}
   */
  abstract resendPassword(params: ResetPasswordInput): Observable<ResetPasswordModel>;
}
