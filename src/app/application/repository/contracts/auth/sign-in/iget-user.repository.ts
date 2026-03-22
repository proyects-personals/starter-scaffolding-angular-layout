import type { Observable } from 'rxjs';
import type { UserModel } from '@/app/domain';

/**
 * @class IGetUserRepository
 * @version 1.0.0
 * @description
 * Interfaz para obtener informacion del usuario autenticado.
 * Define el contrato para cualquier fuente de datos.
 */
export abstract class IGetUserRepository {
  /**
   * @method getCurrentUser
   * @description Obtiene los datos del usuario autenticado.
   * @returns {Observable<UserModel | undefined>} Flujo reactivo con el usuario o undefined.
   */
  abstract getCurrentUser(): Observable<UserModel | undefined>;
}
