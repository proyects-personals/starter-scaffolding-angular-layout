import { Component, inject } from '@angular/core';
import { UrlEnum } from '@/app/domain';
import { Divider } from 'primeng/divider';
import { Button } from 'primeng/button';
import { UserAttributesService } from '@/app/application';

/**
 * @interface SocialNetwork
 * @description Define el contrato para los enlaces a redes sociales en el footer.
 */
interface SocialNetwork {
  icon: string;
  url: string;
  label: string;
}

/**
 * @component FooterComponent
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @description
 * Componente de pie de página que muestra información de copyright, enlaces legales
 * y acceso a redes sociales. Utiliza `UrlEnum` para centralizar la navegación externa.
 * * @example
 * <app-footer />
 */
@Component({
  selector: 'app-footer',
  imports: [Divider, Button],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  /**
   * @readonly
   * @type {number}
   * @description Año actual calculado dinámicamente para el copyright.
   */
  public readonly currentYear: number = new Date().getFullYear();

  /**
   * @readonly
   * @type {typeof UrlEnum}
   * @description Referencia al enumerado de URLs globales para uso en el template.
   */
  public readonly urls: typeof UrlEnum = UrlEnum;

  /**
   * @private userService
   * @description Servicio de atributos del usuario
   */
  private readonly userService = inject(UserAttributesService);

  /**
   * @signal user
   * @description Atributos del usuario autenticado
   */
  public readonly user = this.userService.attributes;

  /**
   * @readonly
   * @type {SocialNetwork[]}
   * @description Listado de redes sociales profesionales con sus respectivos iconos de PrimeIcons.
   */
  public readonly socialMedia: SocialNetwork[] = [
    { icon: 'pi pi-linkedin', url: 'https://linkedin.com/in/steveen-ordonez', label: 'LinkedIn' },
    { icon: 'pi pi-github', url: 'https://github.com/steveen-ordonez', label: 'GitHub' },
    { icon: 'pi pi-twitter-x', url: 'https://x.com/steveen-ordonez', label: 'X' },
  ];

  /**
   * @method navigateTo
   * @description
   * Realiza una navegación externa abriendo una nueva pestaña en el navegador.
   * Utiliza `_blank` para mantener la aplicación activa en la pestaña original.
   * * @param {string} url - Dirección URL absoluta a la que se desea navegar.
   * @returns {void} No retorna valor.
   */
  public navigateTo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
