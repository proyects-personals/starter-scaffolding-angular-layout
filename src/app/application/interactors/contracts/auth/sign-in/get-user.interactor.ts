import type { Observable } from 'rxjs';
import type { UserModel } from '@/app/domain';

/**
 * @class IGetUserInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para obtener usuario.
 */
export abstract class IGetUserInteractor {
  /**
   * @method getCurrentUser
   * @description Obtiene el usuario autenticado.
   * @returns {Observable<UserModel | undefined>}
   */
  abstract getCurrentUser(): Observable<UserModel | undefined>;
}
