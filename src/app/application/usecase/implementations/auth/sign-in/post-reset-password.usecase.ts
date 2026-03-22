import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPostResetPasswordUseCase, IResetPasswordRepository } from '@/app/application';

import type { ResetPasswordModel } from '@/app/domain';
import type { ResetPasswordInput } from 'aws-amplify/auth';

/**
 * @class PostResetPasswordUseCase
 * @version 1.1.0
 * @description
 * Caso de uso que maneja el flujo de reenvio de codigo de recuperacion de contrasena.
 */
export class PostResetPasswordUseCase extends IPostResetPasswordUseCase {
  private readonly repository = inject(IResetPasswordRepository);

  /**
   * @method execute
   * @description Ejecuta el reenvio del codigo validando parametros.
   * @param {ResetPasswordInput} params Datos de entrada.
   * @returns {Observable<ResetPasswordModel>}
   */
  public execute(params: ResetPasswordInput): Observable<ResetPasswordModel> {
    this.validateParams(params);

    return this.repository.resend(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in reset password';

        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * @method validateParams
   * @description Valida los parametros de entrada.
   * @param {ResetPasswordInput} params Datos enviados desde UI.
   */
  private validateParams(params: ResetPasswordInput): void {
    if (!params) {
      throw new Error('Params are required');
    }

    if (!params.username || params.username.trim() === '') {
      throw new Error('Username is required');
    }
  }
}
