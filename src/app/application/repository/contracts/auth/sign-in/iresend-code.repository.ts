import type { Observable } from 'rxjs';
import type { ResendCodeModel } from '@/app/domain';

/**
 * @class IResendCodeRepository
 * @version 1.0.0
 * @description
 * Contrato para el repositorio encargado de reenviar el codigo.
 */
export abstract class IResendCodeRepository {
  /**
   * @method resend
   * @description Reenvia el codigo de confirmacion.
   * @param {string} username Correo o identificador del usuario.
   * @returns {Observable<ResendCodeModel>} Flujo reactivo con el resultado.
   */
  abstract resend(username: string): Observable<ResendCodeModel>;
}
