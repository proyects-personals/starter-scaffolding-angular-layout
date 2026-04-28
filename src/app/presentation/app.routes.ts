import type { Routes } from '@angular/router';
import { LayoutComponent } from '@/app/presentation/component';
import { OnboardingRoutes } from './pages/onboarding/onboarding.routes';
import { ModulesRoutes } from './pages/modules/modules.routes';
import { privateGuard, publicGuard } from '../application';

export const routes: Routes = [
  /**
   * ONBOARDING (solo si NO está autenticado)
   */
  {
    path: 'onboarding',
    canMatch: [publicGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => Promise.resolve(OnboardingRoutes),
      },
    ],
  },

  /**
   * APP PRIVADA (solo autenticados)
   */
  {
    path: '',
    canMatch: [privateGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => Promise.resolve(ModulesRoutes),
      },
    ],
  },

  /**
   * 404 REAL
   */
  {
    path: 'not-found',
    loadComponent: () => import('@/app/presentation').then((m) => m.NotFoundScreenComponent),
  },

  /**
   * fallback final
   */
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
