import type { Routes } from '@angular/router';
import { APP_ROUTES } from '@/app/domain';
import { authStepGuard } from '@/app/application';

/**
 * @constant AuthRoutes
 * @description Rutas hijas de autenticación.
 */
export const AuthRoutes: Routes = [
  {
    path: APP_ROUTES.SIGN_IN,
    loadComponent: () => import('@/app/presentation').then((m) => m.SignInComponent),
  },
  {
    path: APP_ROUTES.CHANGE_PASSWORD,
    // canActivate: [authStepGuard],
     loadComponent: () => import('@/app/presentation').then((m) => m.ChangePasswordComponent),
  },
  {
    path: '',
    redirectTo: APP_ROUTES.SIGN_IN,
    pathMatch: 'full',
  },
];
