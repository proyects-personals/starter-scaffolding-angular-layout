import { Injectable, signal, computed } from '@angular/core';

/**
 * @class AuthStateService
 * @description
 * Servicio de estado global de autenticación basado en Signals.
 * Maneja información del usuario autenticado de forma reactiva.
 */
@Injectable({ providedIn: 'root' })
export class AuthStateService {
  // 🔹 Estado interno (privado)
  private readonly _username = signal<string | null>(null);

  /**
   * @signal username
   * @description
   * Estado reactivo expuesto en solo lectura.
   */
  public readonly username = computed(() => this._username());

  /**
   * @method setUsername
   * @description Guarda el username del usuario autenticado.
   * @param value string
   */
  public setUsername(value: string): void {
    this._username.set(value);
  }

  /**
   * @method getUsername
   * @description Retorna el username actual (no reactivo).
   * @returns string | null
   */
  public getUsername(): string | null {
    return this._username();
  }

  /**
   * @method clear
   * @description Limpia todo el estado de autenticación.
   */
  public clear(): void {
    this._username.set(null);
  }
}
