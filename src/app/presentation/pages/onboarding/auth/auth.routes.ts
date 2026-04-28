import type { Routes } from '@angular/router';
import { APP_ROUTES } from '@/app/domain';
import { authStepGuard } from '@/app/application';
import { CONFIRM_SIGN_IN_PROVIDERS } from '@/app/infrestructure';

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
    path: APP_ROUTES.REQUIRED_PASSWORD,
    canActivate: [authStepGuard],
    loadComponent: () => import('@/app/presentation').then((m) => m.RequiredPasswordComponent),
    providers: [CONFIRM_SIGN_IN_PROVIDERS],
  },
  {
    path: '',
    redirectTo: APP_ROUTES.SIGN_IN,
    pathMatch: 'full',
  },
];
