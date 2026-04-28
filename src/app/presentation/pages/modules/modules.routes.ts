import type { Routes } from '@angular/router';
import { AccountRoutes } from './account/account.routes';

/**
 * @constant ModulesRoutes
 * @description majeja las rutas del módulo de cuentas del usuario.
 */
export const ModulesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => Promise.resolve(AccountRoutes),
      },
    ],
  },
];
