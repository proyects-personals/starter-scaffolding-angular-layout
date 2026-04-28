import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * @function publicGuard
 * @description
 * Protege rutas públicas evitando el acceso de usuarios autenticados.
 * Si el usuario ya tiene sesión activa, es redirigido a la ruta principal (/home).
 * Si no está autenticado, se le permite continuar.
 *
 * @returns {Promise<boolean | UrlTree>}
 * Retorna `true` si el usuario no está autenticado,
 * o un `UrlTree` para redirigir a `/home` si ya tiene sesión.
 *
 * @version 1.0.0
 */
export const publicGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  await auth.sync();
  console.log('publicGuard: isAuthenticated =', auth.isAuthenticated());

  return auth.isAuthenticated() ? router.createUrlTree(['/home']) : true;
};
