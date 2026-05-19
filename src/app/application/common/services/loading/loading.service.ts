import { Injectable, computed, signal } from '@angular/core';

/**
 * Servicio global para la gestión del estado de carga (Loading/Spinner) en la aplicación.
 * Utiliza Angular Signals para un manejo de estado reactivo y de alto rendimiento.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * Signal privado que almacena el estado booleano de la carga.
   * Se utiliza encapsulamiento nativo (#) para evitar modificaciones externas directas.
   */
  readonly #loading = signal<boolean>(false);

  /**
   * Signal computado de solo lectura expuesto para los componentes y directivas.
   * Evita mutaciones accidentales fuera de este servicio.
   */
  public readonly isLoading = computed<boolean>(() => this.#loading());

  /**
   * Activa el estado de carga (asigna true al signal).
   */
  public show(): void {
    this.#loading.set(true);
  }

  /**
   * Desactiva el estado de carga (asigna false al signal).
   */
  public hide(): void {
    this.#loading.set(false);
  }

  /**
   * Alterna de forma segura el estado de carga actual a su valor opuesto.
   */
  public toggle(): void {
    this.#loading.update((value: boolean) => !value);
  }
}
