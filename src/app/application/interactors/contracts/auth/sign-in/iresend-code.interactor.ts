import type { Observable } from 'rxjs';
import type { ResendCodeModel } from '@/app/domain';

/**
 * @class IResendCodeInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para reenviar codigo.
 */
export abstract class IResendCodeInteractor {
  /**
   * @method resendCode
   * @description Ejecuta el reenvio del codigo.
   * @param {string} username Usuario.
   * @returns {Observable<ResendCodeModel>}
   */
  abstract resendCode(username: string): Observable<ResendCodeModel>;
}
