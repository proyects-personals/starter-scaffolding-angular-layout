import type { Routes } from '@angular/router';
import { APP_ROUTES } from '@/app/domain';
import { LayoutComponent } from '@/app/presentation/component';

/**
 * @constant routes
 * @version 1.1.0
 * @author Steveen Ordoñez
 * @type {Routes}
 * @description
 * Definición central del árbol de navegación de la aplicación.
 * Implementa una arquitectura de 'Shell' mediante el `LayoutComponent` y carga perezosa
 * (Lazy Loading) para optimizar el bundle inicial (First Contentful Paint).
 */
export const routes: Routes = [
  {
    /**
     * @description Nodo raíz que envuelve las páginas protegidas o con estructura común.
     */
    path: '',
    component: LayoutComponent,
    children: [
      {
        /**
         * @path welcome
         * @description Carga bajo demanda del componente de bienvenida.
         */
        path: APP_ROUTES.WELCOME,
        loadComponent: () => import('@/app/presentation').then((m) => m.WelcomeComponent),
      },
      {
        /**
         * @path (empty)
         * @description Redirección automática a la página principal del dashboard/welcome.
         */
        path: '',
        redirectTo: APP_ROUTES.WELCOME,
        pathMatch: 'full',
      },
    ],
  },
  {
    /**
     * @path not-found
     * @description Pantalla de error 404 cargada de forma independiente al layout principal.
     */
    path: APP_ROUTES.NOT_FOUND,
    loadComponent: () => import('@/app/presentation').then((m) => m.NotFoundScreenComponent),
  },
  {
    /**
     * @path **
     * @description Comodín (Wildcard) para capturar cualquier ruta no definida y redirigir al 404.
     */
    path: '**',
    redirectTo: APP_ROUTES.NOT_FOUND,
  },
];
