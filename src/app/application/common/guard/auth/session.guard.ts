import { inject } from '@angular/core';
import type { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard único de sesión y routing
 *
 * Reglas:
 * - Si no está logueado → onboarding
 * - Si está logueado → módulos (home y privadas)
 * - Evita estados inconsistentes esperando sync real
 */
export const sessionGuard: CanActivateFn = async (route, state): Promise<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.sync(); // CRÍTICO: SIEMPRE antes de decidir

  const isLogged = auth.isAuthenticated();
  const url = state.url;

  const isOnboarding = url.startsWith('/onboarding');

  // Caso 1: no logueado → solo onboarding
  if (!isLogged && !isOnboarding) {
    return router.createUrlTree(['/onboarding/auth/sign-in']);
  }

  // Caso 2: logueado → no puede volver a onboarding
  if (isLogged && isOnboarding) {
    return router.createUrlTree(['/home']);
  }

  // Caso 3: todo correcto
  return true;
};
