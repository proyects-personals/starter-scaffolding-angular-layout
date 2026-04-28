import type { OnInit } from '@angular/core';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import {
  AuthFlowNavigatorService,
  AuthStateService,
  ErrorHandlerService,
  ISignInInteractor,
} from '@/app/application';

import { SING_IN_PROVIDERS } from '@/app/infrestructure';
import {
  email,
  MIN_PASSWORD_LENGTH,
  minLength,
  required,
  type AppError,
  type ILoginForm,
  type SignInModel,
} from '@/app/domain';
import { ErrorMessageComponent } from '@/app/presentation/component';

/**
 * @class SignInComponent
 * @description
 * Componente encargado del flujo de autenticación del usuario.
 * Maneja login, validación y navegación post-auth.
 */
@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ErrorMessageComponent,
  ],
  templateUrl: './sign-in.component.html',
  providers: [...SING_IN_PROVIDERS],
})
export class SignInComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly signInInteractor = inject(ISignInInteractor);
  private readonly authNavigator = inject(AuthFlowNavigatorService);
  private readonly authState = inject(AuthStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * @signal isLoading
   * @description Estado de carga del login.
   */
  public readonly isLoading = signal(false);

  /**
   * @signal errorMessage
   * @description Mensaje de error para UI.
   */
  public readonly errorMessage = signal<string | null>(null);

  /**
   * @form loginForm
   * @description Formulario reactivo de autenticación.
   */
  public loginForm!: FormGroup<ILoginForm>;

  /**
   * @method ngOnInit
   * @description Inicializa el formulario.
   */
  public ngOnInit(): void {
    this.initForm();
  }

  /**
   * @method initForm
   * @description Construcción del formulario con validaciones tipadas.
   */
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [required, email]),
      password: this.fb.nonNullable.control('', [required, minLength(MIN_PASSWORD_LENGTH)]),
    });
  }

  /**
   * @method onSubmit
   * @description Ejecuta login si el formulario es válido.
   */
  public onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading()) return;
    this.executeSignIn();
  }

  /**
   * @method executeSignIn
   * @description Lógica de autenticación.
   */
  private executeSignIn(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    this.signInInteractor
      .signIn(credentials)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: SignInModel): void => this.handleSuccess(result),
        error: (error: AppError): void => this.handleError(error),
        complete: (): void => this.isLoading.set(false),
      });
  }

  /**
   * @method handleSuccess
   * @description Maneja login exitoso.
   */
  private handleSuccess(result: SignInModel): void {
    if (!result.isSuccess()) return;

    const email = this.loginForm.getRawValue().email;
    this.authState.setUsername(email);

    this.authNavigator.navigateByStep(result);
  }

  /**
   * @method handleError
   * @description Maneja errores del login.
   */
  private handleError(error: AppError): void {
    this.errorMessage.set(this.errorHandler.map(error));
    this.isLoading.set(false);
  }

  /**
   * @method navigateForgotPassword
   */
  public navigateForgotPassword(): void {
    void this.router.navigate(['/forgot-password']);
  }

  /**
   * @method goToRegister
   */
  public goToRegister(): void {
    void this.router.navigate(['/registro']);
  }
}
