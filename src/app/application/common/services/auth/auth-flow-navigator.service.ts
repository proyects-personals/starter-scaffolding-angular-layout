import type { SignInModel } from '@/app';
import { SignUpStepEnum } from '@/app';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthFlowNavigatorService {
  private lastSignInResult: SignInModel | null = null;
  private readonly router = inject(Router);

  /**
   * @method navigateByStep
   * @description
   * Navega según el estado del flujo de autenticación retornado por Cognito.
   */
  public navigateByStep(result: SignInModel): void {
    this.lastSignInResult = result;

    const step = result.getNextStep();

    switch (step) {
      case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED:
        void this.router.navigate(['/onboarding/auth/required-password']);
        break;

      case SignUpStepEnum.CONFIRM_SIGN_UP:
        void this.router.navigate(['/onboarding/auth/confirm-signup']);
        break;

      case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_SMS_CODE:
      case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_TOTP_CODE:
        void this.router.navigate(['/onboarding/auth/mfa-verification']);
        break;

      case SignUpStepEnum.DONE:
        void this.router.navigateByUrl('/home', {
          replaceUrl: true,
          onSameUrlNavigation: 'reload',
        });
        break;

      default:
        void this.router.navigate(['/onboarding/auth/sign-in']);
        break;
    }
  }

  /**
   * @method hasActiveChallenge
   * @description
   * Indica si existe un flujo de autenticación activo pendiente.
   */
  public hasActiveChallenge(): boolean {
    return this.lastSignInResult !== null;
  }

  /**
   * @method clearChallenge
   * @description
   * Limpia el estado del flujo de autenticación.
   */
  public clearChallenge(): void {
    this.lastSignInResult = null;
  }
}
