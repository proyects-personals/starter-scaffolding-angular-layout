import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthFlowNavigatorService, IResendCodeInteractor, ISignInInteractor } from '@/app/application';
import { RESEND_CODE_PROVIDERS, SING_IN_PROVIDERS } from '@/app/infrestructure';
import { SignUpStepEnum } from '@/app/domain';
import { resetPassword } from 'aws-amplify/auth';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  providers: [...SING_IN_PROVIDERS, ...RESEND_CODE_PROVIDERS,],
})
export class SignInComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly isignInInteractor = inject(ISignInInteractor);
  private readonly authNavigator = inject(AuthFlowNavigatorService);
  private readonly iresendCodeInteractor = inject(IResendCodeInteractor);

  public loginForm!: FormGroup;
  public isLoading = false;

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * @method initForm
   * @description Inicializa el formulario reactivo con validaciones.
   */
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * @method onSubmit
   * @description Punto de entrada del formulario.
   */
  public onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) return;
    this.handleSignIn();
  }

  /**
   * @method handleSignIn
   * @description Ejecuta la lógica de negocio a través del Interactor.
   */
  public handleSignIn(): void {
    const { email, password } = this.loginForm.value;

    this.isLoading = true;

    this.isignInInteractor.signIn({ email, password }).subscribe({
      next: (result) => {
        console.log('SignIn exitoso:', result);
        if (
          result.isSuccess() &&
          result.getNextStep() === SignUpStepEnum.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
        ) {
          this.authNavigator.navigateByStep(result);
          resetPassword({username: email})
          // this.resedCode(email);
        }
        if( result.isSuccess()) {
           this.authNavigator.navigateByStep(result);
        }
      },
      error: (err) => {
        console.error('Error en SignIn:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private resedCode(username: string): void {
    this.iresendCodeInteractor.resendCode(username).subscribe({
      next(value) {
          console.log(value);
      },
      error(err) {
          console.error(err);
      },
      complete() {
          
      },
    })
  }

  public navigateForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  public goToRegister(): void {
    this.router.navigate(['/registro']);
  }
}
