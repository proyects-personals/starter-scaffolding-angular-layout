import type { Routes } from '@angular/router';
import { APP_ROUTES } from '@/app/domain';
import { LayoutComponent } from '@/app/presentation/component';
import { OnboardingRoutes } from './pages/onboarding/onboarding.routes';

/**
 * @constant routes
 * @description Configuración raíz. Define el Layout y carga el módulo de onboarding.
 */
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: APP_ROUTES.ONBOARDING,
        loadChildren: () => Promise.resolve(OnboardingRoutes),
      },
      {
        path: '',
        redirectTo: APP_ROUTES.ONBOARDING,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    loadComponent: () => 
      import('@/app/presentation').then((m) => m.NotFoundScreenComponent),
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.NOT_FOUND,
  },
];