import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { IResetPasswordInteractor } from '@/app/application';
import { IPostResetPasswordUseCase } from '@/app/application';

import type { ResetPasswordModel } from '@/app/domain';
import type { ResetPasswordInput } from 'aws-amplify/auth';

/**
 * @class ResetPasswordInteractor
 * @version 1.1.0
 * @description
 * Interactor que expone el flujo de recuperacion de contrasena hacia la UI.
 */
export class ResetPasswordInteractor implements IResetPasswordInteractor {
  private readonly useCase = inject(IPostResetPasswordUseCase);

  /**
   * @method resendCode
   * @description Ejecuta el reenvio del codigo de recuperacion.
   * @param {ResetPasswordInput} params Datos de entrada.
   * @returns {Observable<ResetPasswordModel>}
   */
  public resendPassword(params: ResetPasswordInput): Observable<ResetPasswordModel> {
    return this.useCase.execute(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in reset password';

        return throwError(() => new Error(message));
      }),
    );
  }
}
