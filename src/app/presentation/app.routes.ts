import type { Routes } from '@angular/router';
import { LayoutComponent } from '@/app/presentation/component';
import { OnboardingRoutes } from './pages/onboarding/onboarding.routes';
import { ModulesRoutes } from './pages/modules/modules.routes';
import { privateGuard, publicGuard } from '../application';

export const routes: Routes = [
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
  {
    path: 'not-found',
    loadComponent: () => import('@/app/presentation').then((m) => m.NotFoundScreenComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
