import type { Observable } from 'rxjs';
import type { ResendCodeModel } from '@/app/domain';

/**
 * @class IPostResendCodeUseCase
 * @version 1.0.0
 * @description
 * Contrato del caso de uso para reenviar codigo.
 */
export abstract class IPostResendCodeUseCase {
  /**
   * @method execute
   * @description Ejecuta el reenvio del codigo.
   * @param {string} username Identificador del usuario.
   * @returns {Observable<ResendCodeModel>}
   */
  abstract execute(username: string): Observable<ResendCodeModel>;
}
