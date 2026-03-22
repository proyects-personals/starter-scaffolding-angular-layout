import { Component, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drawer } from 'primeng/drawer';
import { Ripple } from 'primeng/ripple';
import { Avatar } from 'primeng/avatar';

/**
 * @interface MenuItem
 * @description Define la estructura estricta para los elementos de navegación del sidebar.
 * @property {string} label - El texto descriptivo que se mostrará al usuario.
 * @property {string} icon - La clase de PrimeIcons para el glifo visual (ej: 'pi pi-home').
 * @property {string} route - El path de navegación para el router de Angular.
 */
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

/**
 * @component SidebarComponent
 * @version 1.1.0
 * @author Steveen Ordoñez
 * @description
 * Componente de navegación lateral basado en PrimeNG `Drawer`.
 * Implementa el patrón de **Signals** de Angular para una reactividad eficiente y cumple
 * con las reglas de estilo de ESLint para outputs.
 * * @example
 * <app-sidebar [(visible)]="isSidebarVisible" (closed)="onSidebarClosed()" />
 */
@Component({
  selector: 'app-sidebar',
  imports: [Drawer, Ripple, Avatar, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  /**
   * @readonly
   * @type {ModelSignal<boolean>}
   * @description Model Signal para controlar la visibilidad del componente.
   * Soporta Two-Way Data Binding nativo mediante la sintaxis `[(visible)]`.
   */
  public readonly visible = model<boolean>(false);

  /**
   * @readonly
   * @type {OutputEmitterRef<void>}
   * @description Emisor de eventos que se dispara cuando el sidebar se oculta manualmente.
   * Cumple con el naming convention de evitar el prefijo 'on'.
   */
  public readonly closed = output<void>();

  /**
   * @readonly
   * @type {MenuItem[]}
   * @description Colección estática de rutas y etiquetas para el menú principal.
   */
  public readonly menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Proyectos', icon: 'pi pi-briefcase', route: '/projects' },
    { label: 'Configuración', icon: 'pi pi-cog', route: '/settings' },
  ];

  /**
   * @method handleHide
   * @description
   * Ejecuta la lógica de limpieza necesaria al cerrar el sidebar y notifica
   * a los suscriptores a través del output `closed`.
   * * @returns {void} No devuelve ningún valor.
   */
  public handleHide(): void {
    this.closed.emit();
  }
}
