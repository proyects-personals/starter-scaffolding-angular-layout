import type { Observable } from 'rxjs';
import type { ResetPasswordModel } from '@/app/domain';
import type { ResetPasswordInput } from 'aws-amplify/auth';

/**
 * @class IPostResetPasswordUseCase
 * @version 1.0.0
 * @description
 * Contrato del caso de uso para reenvio de codigo de contrasena.
 */
export abstract class IPostResetPasswordUseCase {
  /**
   * @method execute
   * @description Ejecuta el flujo de recuperacion.
   * @param {ResetPasswordInput} params Datos de entrada.
   * @returns {Observable<ResetPasswordModel>}
   */
  abstract execute(params: ResetPasswordInput): Observable<ResetPasswordModel>;
}
