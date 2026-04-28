import type { OnInit } from '@angular/core';
import { Component, inject, signal, DestroyRef } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IConfirmSignInInteractor, AuthStateService, ErrorHandlerService } from '@/app/application';

import {
  type ConfirmSignInInputEntity,
  type ConfirmSignInModel,
  type AppError,
  type PasswordForm,
  PASSWORD_VALIDATORS,
} from '@/app/domain';

import { ErrorMessageComponent } from '@/app/presentation/component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

/**
 * @component RequiredPasswordComponent
 * @description
 * Componente encargado del flujo donde el usuario debe establecer una nueva contraseña
 * como parte del proceso de autenticación (ej. MFA o políticas de seguridad de AWS Cognito).
 *
 * Responsabilidades:
 * - Construcción del formulario reactivo.
 * - Carga de estado de usuario autenticado parcial.
 * - Ejecución del caso de uso de confirmación de sign-in.
 * - Manejo de estados de carga.
 * - Manejo de errores de dominio.
 * - Redirección al finalizar el flujo.
 *
 * Este componente actúa como capa de presentación (UI Orchestrator),
 * sin lógica de negocio compleja.
 */
@Component({
  selector: 'app-required-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    ButtonModule,
    PasswordModule,
    InputTextModule,
  ],
  templateUrl: './required-password-component.html',
})
export class RequiredPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly confirmSignInInteractor = inject(IConfirmSignInInteractor);
  private readonly authState = inject(AuthStateService);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly isLoading = signal(false);
  public readonly showPassword = signal(false);
  public readonly errorMessage = signal<string | null>(null);
  public readonly requireUsernameInput = signal(false);
  public form!: FormGroup<PasswordForm>;

  /**
   * @method ngOnInit
   * @description Inicializa formulario y carga estado previo del usuario si existe.
   */
  ngOnInit(): void {
    this.initForm();
    this.loadUsernameIfExists();
  }

  /**
   * @method initForm
   * @description Construye el formulario reactivo con validaciones de negocio.
   */
  private initForm(): void {
    this.form = this.fb.nonNullable.group<PasswordForm>({
      username: this.fb.nonNullable.control(''),
      password: this.fb.nonNullable.control('', PASSWORD_VALIDATORS),
    });
  }

  /**
   * @method loadUsernameIfExists
   * @description
   * Recupera el username desde el estado global de autenticación
   * y lo pre-carga en el formulario si existe.
   */
  private loadUsernameIfExists(): void {
    const username = this.authState.getUsername();

    if (!username) {
      this.requireUsernameInput.set(true);
      return;
    }

    this.form.patchValue({ username });
    this.form.get('username')?.disable();
  }

  /**
   * @method onSubmit
   * @description
   * Valida el formulario y ejecuta el flujo de confirmación de contraseña.
   */
  public onSubmit(): void {
    if (this.form.invalid || this.isLoading()) return;

    const { username, password } = this.form.getRawValue();
    const resolvedUsername = this.authState.getUsername() ?? username;

    if (!resolvedUsername) {
      this.errorMessage.set('Usuario requerido para continuar el flujo');
      return;
    }

    this.executeConfirmSignIn(resolvedUsername, password);
  }

  /**
   * @method togglePassword
   * @description Alterna visibilidad del campo de contraseña.
   */
  public togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  /**
   * @method executeConfirmSignIn
   * @description Ejecuta el caso de uso de confirmación de sign-in.
   */
  private executeConfirmSignIn(username: string, password: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload: ConfirmSignInInputEntity = {
      newPassword: password,
      attributes: { username },
    };

    this.confirmSignInInteractor
      .confirm(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: ConfirmSignInModel) => this.handleSuccess(result),
        error: (error: AppError) => this.handleError(error),
        complete: () => this.isLoading.set(false),
      });
  }

  /**
   * @method handleSuccess
   * @description Maneja el resultado exitoso del flujo de autenticación.
   */
  private handleSuccess(result: ConfirmSignInModel): void {
    if (!result.isSignedIn) return;

    this.authState.clear();
    void this.router.navigate(['/home']);
  }

  /**
   * @method handleError
   * @description Convierte errores en mensajes legibles para UI.
   */
  private handleError(error: AppError): void {
    this.errorMessage.set(this.errorHandler.map(error));
    this.isLoading.set(false);
  }
}
