import type { Routes } from '@angular/router';
import { APP_ROUTES } from '@/app/domain';
import { AuthRoutes } from './auth/auth.routes';

/**
 * @constant OnboardingRoutes
 * @description Maneja el componente Welcome y delega el login al sub-módulo Auth.
 */
export const OnboardingRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => 
          import('@/app/presentation').then((m) => m.WelcomeComponent),
      },
      {
        path: APP_ROUTES.AUTH,
        loadChildren: () => Promise.resolve(AuthRoutes),
      },
    ],
  },
];