import { SignInModel, SignUpStepEnum } from '@/app';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthFlowNavigatorService {
  private lastSignInResult: SignInModel | null = null;
  private readonly router = inject(Router);

  public navigateByStep(result: SignInModel): void {
    this.lastSignInResult = result;
    const step = result.getNextStep();

    switch (step) {
      case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED:
        this.router.navigate(['/onboarding/auth/change-password']);
        break;

      case SignUpStepEnum.CONFIRM_SIGN_UP:
        this.router.navigate(['/onboarding/auth/confirm-signup']);
        break;

      case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_SMS_CODE:
      case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_TOTP_CODE:
        this.router.navigate(['/onboarding/auth/mfa-verification']);
        break;

      case SignUpStepEnum.DONE:
        this.router.navigate(['/home']);
        break;

      default:
        console.warn('⚠️ Paso de autenticación no reconocido:', step);
        this.router.navigate(['/onboarding/auth/sign-in']);
        break;
    }
  }

  public hasActiveChallenge(): boolean {
    return this.lastSignInResult !== null;
  }

  public clearChallenge(): void {
    this.lastSignInResult = null;
  }
}
