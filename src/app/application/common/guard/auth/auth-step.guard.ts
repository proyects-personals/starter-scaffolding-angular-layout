import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFlowNavigatorService } from '../../services';

/**
 * @description Evita que entren a pasos de configuración (MFA, New Password)
 * si no tienen un resultado de SignIn previo almacenado.
 */
export const authStepGuard: CanActivateFn = () => {
  const router = inject(Router);
  const flowService = inject(AuthFlowNavigatorService);

  if (flowService.hasActiveChallenge()) {
    return true;
  }

  router.navigate(['/onboarding/auth/sign-in']);
  return false;
};