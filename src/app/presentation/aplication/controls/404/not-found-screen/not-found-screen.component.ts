import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@domain';

/**
 * @component NotFoundScreenComponent
 * @description
 * Componente de presentación para la gestión de errores de ruta (404).
 * Proporciona una interfaz amigable cuando el usuario intenta acceder a recursos inexistentes.
 * @layer Presentation
 * @version 1.0.0
 */
@Component({
  selector: 'app-not-found-screen',
  imports: [],
  templateUrl: './not-found-screen.component.html',
})
export class NotFoundScreenComponent {
  private readonly _router = inject(Router);
  public readonly routes = APP_ROUTES;

  /**
   * @method handleBackHome
   * @description
   * Ejecuta la lógica de redirección hacia la raíz de la aplicación.
   * Utiliza la navegación programática para asegurar que el estado del router se limpie.
   * @returns {Promise<boolean>} Promesa que indica si la navegación fue exitosa.
   */
  public async handleBackHome(): Promise<boolean> {
    return await this._router.navigate([this.routes.ROOT]);
  }
}
