import type { Observable } from 'rxjs';
import type { UserModel } from '@/app/domain';

/**
 * @class IGetUserUseCase
 * @version 1.0.0
 * @description
 * Contrato para obtener el usuario autenticado.
 */
export abstract class IGetUserUseCase {
  /**
   * @method execute
   * @description Ejecuta la obtencion del usuario.
   * @returns {Observable<UserModel | undefined>}
   */
  abstract execute(): Observable<UserModel | undefined>;
}
