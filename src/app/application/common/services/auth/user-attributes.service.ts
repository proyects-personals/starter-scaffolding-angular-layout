import { Injectable, computed, signal } from '@angular/core';
import type { FetchUserAttributesOutput } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';

/**
 * Servicio encargado de gestionar los atributos del usuario autenticado
 * utilizando AWS Amplify.
 *
 * Implementa Angular Signals para manejo reactivo del estado.
 *
 * Responsabilidades:
 * - Obtener atributos del usuario desde Cognito
 * - Exponer estado reactivo (loading, error, data)
 * - Proveer propiedades derivadas (email, username, sub)
 */
@Injectable({
  providedIn: 'root',
})
export class UserAttributesService {
  readonly #attributes = signal<FetchUserAttributesOutput | null>(null);
  readonly #loading = signal<boolean>(false);
  readonly #error = signal<string | null>(null);

  public readonly attributes = computed(() => this.#attributes());
  public readonly loading = computed(() => this.#loading());
  public readonly error = computed(() => this.#error());

  /**
   * @description
   * Email del usuario autenticado
   */
  public readonly email = computed(() => this.#attributes()?.email ?? null);

  /**
   * @description
   * Username del usuario (preferred_username)
   */
  public readonly username = computed(() => this.#attributes()?.preferred_username ?? null);

  /**
   * @description
   * Identificador único del usuario (sub)
   */
  public readonly sub = computed(() => this.#attributes()?.sub ?? null);

  /**
   * @description
   * Obtiene los atributos del usuario desde AWS Cognito
   * y actualiza el estado interno.
   *
   * @returns Promise<void>
   */
  public async loadUserAttributes(): Promise<void> {
    this.#loading.set(true);
    this.#error.set(null);

    try {
      const attrs = await fetchUserAttributes();
      console.log('ver atributos:', attrs);
      this.#attributes.set(attrs);
    } catch (error: unknown) {
      this.#error.set(
        error instanceof Error ? error.message : 'Error obteniendo atributos del usuario',
      );
      this.#attributes.set(null);
    } finally {
      this.#loading.set(false);
    }
  }

  /**
   * @description
   * Refresca los atributos del usuario
   *
   * @returns Promise<void>
   */
  public async refresh(): Promise<void> {
    await this.loadUserAttributes();
  }

  /**
   * @description
   * Limpia el estado interno del servicio.
   * Usado típicamente en logout.
   */
  public clear(): void {
    this.#attributes.set(null);
    this.#error.set(null);
    this.#loading.set(false);
  }
}
