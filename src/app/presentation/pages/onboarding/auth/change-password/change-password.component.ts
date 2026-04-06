import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { IResendCodeInteractor, IResetPasswordInteractor } from '@/app/application';
import { RESEND_CODE_PROVIDERS, RESEND_PASSWORK_PROVIDERS } from '@/app/infrestructure';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './change-password.component.html',
  providers: [...RESEND_PASSWORK_PROVIDERS],
})
export class ChangePasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly iresetPasswordInteractor = inject(IResetPasswordInteractor);

  public resetForm!: FormGroup;
  public isLoading = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmationCode: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  // Validador personalizado para confirmar contraseñas
  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  public async onSubmit(): Promise<void> {
    if (this.resetForm.invalid) return;

    try {
      this.isLoading = true;

      const values = this.resetForm.value;
      console.log('Enviando nueva contraseña:', values);

      this.router.navigate(['/onboarding/auth/sign-in']);
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
