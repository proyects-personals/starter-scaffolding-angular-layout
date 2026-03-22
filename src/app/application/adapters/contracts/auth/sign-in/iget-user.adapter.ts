import type { Observable } from 'rxjs';
import type { UserEntity } from '@/app/domain';

/**
 * @class IGetUserAdapter
 * @version 1.0.0
 * @description
 * Interfaz para obtener los atributos del usuario autenticado.
 * Define el contrato para proveedores de identidad.
 */
export abstract class IGetUserAdapter {
  /**
   * @method fetch
   * @description Obtiene los atributos del usuario autenticado.
   * @returns {Observable<UserEntity | undefined>} Flujo con la entidad del usuario o undefined en caso de error.
   */
  abstract fetch(): Observable<UserEntity | undefined>;
}
