import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * privateGuard
 *
 * Protege rutas privadas de la aplicación.
 *
 * Reglas:
 * - Si el usuario está autenticado → permite acceso
 * - Si NO está autenticado → redirige a onboarding/login
 */
export const privateGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  await auth.sync();

  console.log('privateGuard: isAuthenticated =', auth.isAuthenticated());

  return auth.isAuthenticated() ? true : router.createUrlTree(['/onboarding/auth/sign-in']);
};
