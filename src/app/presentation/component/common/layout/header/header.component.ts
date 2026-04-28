import type { OnInit } from '@angular/core';
import { Component, inject, signal, output } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import type { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { APP_ROUTES } from '@/app/domain';

/**
 * @component HeaderComponent
 * @description
 * Componente de cabecera con navegación principal y control de sidebar.
 * Maneja estado de ruta activa para UI reactiva.
 *
 * @version 1.0.2
 */
@Component({
  selector: 'app-header',
  imports: [Menubar, Button, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);

  /**
   * @signal isSignInRoute
   * @description Indica si el usuario está en la ruta de login.
   */
  public readonly isSignInRoute = signal(false);

  /**
   * @output menuClicked
   * @description Evento emitido al abrir menú lateral.
   */
  public readonly menuClicked = output<void>();

  /**
   * @property items
   * @description Items del menú principal.
   */
  public items: MenuItem[] = [];

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        const signInPath = `/${APP_ROUTES.ONBOARDING}/${APP_ROUTES.AUTH}/${APP_ROUTES.SIGN_IN}`;

        this.isSignInRoute.set(event.urlAfterRedirects === signInPath);
      });
  }

  /**
   * @method ngOnInit
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
   */
  public handleMenuClick(): void {
    this.menuClicked.emit();
  }

  /**
   * @method goToLogin
   * @description Navega a login de forma silenciosa.
   */
  public goToLogin(): void {
    const path = `/${APP_ROUTES.ONBOARDING}/${APP_ROUTES.AUTH}/${APP_ROUTES.SIGN_IN}`;

    this.router.navigate([path]).catch(() => {
      /* no-op */
    });
  }

  /**
   * @method goToHome
   * @description Navega a home de forma silenciosa.
   */
  public goToHome(): void {
    this.router.navigate(['/onboarding']).catch(() => {
      /* no-op */
    });
  }
}
