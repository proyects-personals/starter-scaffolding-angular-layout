import type { WritableSignal } from '@angular/core';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, SidebarComponent, HeaderComponent } from '@/app/presentation/component';

/**
 * @component LayoutComponent
 * @version 1.0.1
 * @author Steveen Ordoñez
 * @description
 * Componente estructural (Shell) que define el layout principal de la aplicación.
 * Orquestra la visibilidad de la barra lateral, el encabezado y el pie de página,
 * gestionando el estado de autenticación de forma reactiva.
 * * @example
 * <app-layout></app-layout>
 */
@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  /**
   * @readonly
   * @type {WritableSignal<boolean>}
   * @description Indica si el usuario actual ha iniciado sesión.
   * Determina si se permite la interacción con elementos protegidos como el Sidebar.
   * @default true
   */
  public readonly isAuthenticated: WritableSignal<boolean> = signal<boolean>(true);

  /**
   * @readonly
   * @type {WritableSignal<boolean>}
   * @description Estado reactivo que controla la apertura o cierre del Sidebar.
   * @default false
   */
  public readonly isSidebarVisible: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * @method toggleSidebar
   * @description
   * Cambia el estado de visibilidad del Sidebar (abre/cierra).
   * Contiene una regla de negocio que solo permite la alternancia si el usuario
   * está autenticado.
   * * @returns {void} No retorna ningún valor.
   */
  public toggleSidebar(): void {
    if (this.isAuthenticated()) {
      this.isSidebarVisible.update((visible: boolean) => !visible);
    }
  }
}
