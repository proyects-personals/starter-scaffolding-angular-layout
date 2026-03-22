import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { IResendCodeInteractor } from '@/app/application';
import { IPostResendCodeUseCase } from '@/app/application';

import type { ResendCodeModel } from '@/app/domain';

/**
 * @class ResendCodeInteractor
 * @version 1.1.0
 * @description
 * Interactor que expone el reenvio de codigo hacia la capa de presentacion.
 */
export class ResendCodeInteractor implements IResendCodeInteractor {
  private readonly useCase = inject(IPostResendCodeUseCase);

  /**
   * @method resendCode
   * @description Ejecuta el flujo de reenvio de codigo.
   * @param {string} username Usuario.
   * @returns {Observable<ResendCodeModel>}
   */
  public resendCode(username: string): Observable<ResendCodeModel> {
    return this.useCase.execute(username).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in resend code';

        return throwError(() => new Error(message));
      }),
    );
  }
}
