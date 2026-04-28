import { Injectable, signal } from '@angular/core';

/**
 * @class AuthManagerService
 * @description
 * Servicio de estado de autenticación basado en signals.
 * Mantiene en memoria el identificador del usuario autenticado
 * y permite consultar o actualizar su estado de sesión.
 *
 * Este servicio no realiza llamadas a backend ni persistencia,
 * únicamente gestiona el estado en memoria de la aplicación.
 *
 * @version 1.0.0
 */
@Injectable({ providedIn: 'root' })
export class AuthManagerService {
  /**
   * @private
   * @signal _userId
   * @description
   * Estado interno reactivo que almacena el identificador del usuario autenticado.
   */
  private readonly _userId = signal<string | null>(null);

  /**
   * @method isAuthenticated
   * @description
   * Verifica si existe un usuario autenticado en memoria.
   *
   * @returns {boolean}
   * `true` si existe un userId almacenado, `false` en caso contrario.
   */
  public isAuthenticated(): boolean {
    return this._userId() !== null;
  }

  /**
   * @method setUserId
   * @description
   * Guarda el identificador del usuario autenticado en el estado.
   *
   * @param {string} id - Identificador único del usuario.
   */
  public setUserId(id: string): void {
    this._userId.set(id);
  }

  /**
   * @method clear
   * @description
   * Limpia el estado de autenticación eliminando el usuario en memoria.
   */
  public clear(): void {
    this._userId.set(null);
  }
}
