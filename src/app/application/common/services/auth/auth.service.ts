import { Injectable, inject } from '@angular/core';
import { getCurrentUser, type AuthUser } from 'aws-amplify/auth';
import { AuthManagerService } from './auth-manager.service';

/**
 * @class AuthService
 * @description
 * Servicio encargado de sincronizar la sesión del usuario con AWS Amplify
 * y mantener el estado de autenticación en memoria a través de AuthManagerService.
 *
 * Responsabilidades:
 * - Consultar sesión activa en Amplify
 * - Sincronizar usuario en el estado global
 * - Exponer estado de autenticación a guards y componentes
 *
 * No almacena lógica de negocio compleja ni tokens directamente.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * @private
   * @description
   * Estado global de autenticación en memoria.
   */
  private readonly authState = inject(AuthManagerService);

  /**
   * @method sync
   * @description
   * Sincroniza el estado de autenticación con AWS Amplify.
   *
   * - Obtiene el usuario actual desde Amplify
   * - Si existe usuario, lo guarda en el estado global
   * - Si no existe, limpia el estado de sesión
   *
   * @returns {Promise<void>}
   */
  public async sync(): Promise<void> {
    const user = await this.getCurrentUserSafe();
    this.applyUserToState(user);
  }

  /**
   * @method isAuthenticated
   * @description
   * Indica si el usuario está autenticado según el estado en memoria.
   *
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    return this.authState.isAuthenticated();
  }

  /**
   * @method getCurrentUserSafe
   * @description
   * Obtiene el usuario actual desde AWS Amplify de forma segura.
   * Evita excepciones cuando no hay sesión activa.
   *
   * @returns {Promise<AuthUser | null>}
   */
  private async getCurrentUserSafe(): Promise<AuthUser | null> {
    try {
      return await getCurrentUser();
    } catch {
      return null;
    }
  }

  /**
   * @method applyUserToState
   * @description
   * Aplica el usuario obtenido al estado global.
   *
   * Si el usuario existe:
   * - Guarda su userId en el estado
   *
   * Si no existe:
   * - Limpia el estado de autenticación
   *
   * @param user Usuario obtenido desde Amplify o null
   */
  private applyUserToState(user: AuthUser | null): void {
    if (user?.userId) {
      this.authState.setUserId(user.userId);
      return;
    }

    this.authState.clear();
  }
}
