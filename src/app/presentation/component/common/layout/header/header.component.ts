import type { OnInit } from '@angular/core';
import { Component, output } from '@angular/core';
import type { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';

/**
 * @component HeaderComponent
 * @version 1.0.2
 * @author Steveen Ordoñez
 * @description
 * Componente de cabecera que gestiona la barra de navegación superior y el activador
 * del menú lateral. Utiliza PrimeNG `Menubar` para los enlaces de navegación.
 * * @example
 * <app-header (menuClicked)="toggleSidebar()" />
 */
@Component({
  selector: 'app-header',
  imports: [Menubar, Button],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  /**
   * @readonly
   * @type {OutputEmitterRef<void>}
   * @description Emisor de eventos que notifica cuando se interactúa con el botón de menú
   * (típicamente para abrir el Sidebar).
   * Nota: Se renombró de 'onMenuClick' a 'menuClicked' para cumplir con las guías de Angular.
   */
  public readonly menuClicked = output<void>();

  /**
   * @type {MenuItem[] | undefined}
   * @description Configuración de los elementos de menú que se muestran en el Menubar.
   * Se inicializa en el ciclo de vida ngOnInit.
   */
  public items: MenuItem[] | undefined;

  /**
   * @method ngOnInit
   * @description Inicializa la configuración de la barra de navegación superior.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Proyectos', icon: 'pi pi-briefcase' },
      { label: 'Contacto', icon: 'pi pi-envelope' },
    ];
  }

  /**
   * @method handleMenuClick
   * @description Dispara la emisión del evento para notificar al layout el deseo de abrir el menú.
   * @returns {void}
   */
  public handleMenuClick(): void {
    this.menuClicked.emit();
  }
}
