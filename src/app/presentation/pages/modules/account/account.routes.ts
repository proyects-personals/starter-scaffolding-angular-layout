import type { Routes } from '@angular/router';
import { APP_ROUTES } from '@/app/domain';

/**
 * @constant AccountRoutes
 * @description Rutas hijas de autenticación.
 */
export const AccountRoutes: Routes = [
  {
    path: APP_ROUTES.HOME,
    loadComponent: () => import('@/app/presentation').then((m) => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: APP_ROUTES.HOME,
    pathMatch: 'full',
  },
];
