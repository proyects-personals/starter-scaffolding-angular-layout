import type { OnInit } from '@angular/core';
import { Component, inject, signal, computed } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { ButtonModule } from 'primeng/button';
import { APP_ROUTES } from '@/app/domain';
import { UserAttributesService } from '@/app/application';
import { AvatarModule } from 'primeng/avatar';
import { MegaMenuModule } from 'primeng/megamenu';
import { RippleModule } from 'primeng/ripple';
import type { MegaMenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

/**
 * @component HeaderComponent
 * @description
 * Componente de cabecera principal de la aplicación.
 *
 * Responsabilidades:
 * - Renderizar navegación principal
 * - Detectar ruta actual (login)
 * - Mostrar estado de autenticación del usuario
 * - Exponer acciones de navegación
 *
 * @version 2.0.0
 */
@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonModule,
    RouterLink,
    AvatarModule,
    ButtonModule,
    MegaMenuModule,
    RippleModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  /**
   * @private router
   * @description Servicio de navegación Angular Router
   */
  private readonly router = inject(Router);

  /**
   * @private userService
   * @description Servicio de atributos del usuario
   */
  private readonly userService = inject(UserAttributesService);

  /**
   * @signal isSignInRoute
   * @description Indica si la ruta actual es login
   */
  public readonly isSignInRoute = signal(false);

  /**
   * @signal user
   * @description Atributos del usuario autenticado
   */
  public readonly user = this.userService.attributes;

  /**
   * @signal email
   * @description Email del usuario autenticado
   */
  public readonly email = this.userService.email;

  /**
   * @signal isAuthenticated
   * @description Indica si existe usuario autenticado
   */
  public readonly isAuthenticated = computed(() => !!this.user());

  /**
   * @property items
   * @description Items del menú principal
   */
  public items: MegaMenuItem[] = [];

  /**
   * @constructor
   * @description Inicializa listeners y carga de usuario
   */
  constructor() {
    this.#listenRouteChanges();
    this.#loadUser();
  }

  /**
   * @method ngOnInit
   * @description Inicializa el menú principal
   */
  public ngOnInit(): void {
    this.#initMenu();
  }

  /**
   * @method #initMenu
   * @description Configura los items del menú principal
   * @private
   */
  #initMenu(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Proyectos',
        icon: 'pi pi-briefcase',
        items: [
          [
            {
              label: 'Frontend',
              items: [
                {
                  label: 'Angular',
                  icon: 'pi pi-code',
                },
                {
                  label: 'Tailwind',
                  icon: 'pi pi-palette',
                },
              ],
            },
          ],
        ],
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        items: [
          [
            {
              label: 'Redes',
              items: [
                {
                  label: 'GitHub',
                  icon: 'pi pi-github',
                },
              ],
            },
          ],
        ],
      },
    ];
  }

  #listenRouteChanges(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        const signInPath = this.#getSignInPath();

        this.isSignInRoute.set(event.urlAfterRedirects === signInPath);
      });
  }

  /**
   * @method #loadUser
   * @description Dispara la carga de atributos del usuario
   * @private
   */
  #loadUser(): void {
    void this.userService.loadUserAttributes();
  }

  /**
   * @method #getSignInPath
   * @description Construye la ruta de login
   * @returns string
   * @private
   */
  #getSignInPath(): string {
    return `/${APP_ROUTES.ONBOARDING}/${APP_ROUTES.AUTH}/${APP_ROUTES.SIGN_IN}`;
  }

  /**
   * @method goToLogin
   * @description Navega a login
   */
  public goToLogin(): void {
    void this.router.navigate([this.#getSignInPath()]);
  }

  /**
   * @method goToHome
   * @description Navega a home
   */
  public goToHome(): void {
    void this.router.navigate(['/onboarding']);
  }
}
