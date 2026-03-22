import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { IConfirmSignUpInteractor } from '@/app/application';
import { IPostConfirmSignUpUseCase } from '@/app/application';

import type { ConfirmSignUpModel } from '@/app/domain';
import type { ConfirmSignUpInput } from 'aws-amplify/auth';

/**
 * @class ConfirmSignUpInteractor
 * @version 1.1.0
 * @description
 * Interactor que expone la confirmacion de registro hacia la capa de presentacion.
 */
export class ConfirmSignUpInteractor implements IConfirmSignUpInteractor {
  private readonly useCase = inject(IPostConfirmSignUpUseCase);

  /**
   * @method confirm
   * @description Ejecuta el flujo de confirmacion.
   * @param {ConfirmSignUpInput} params Datos de confirmacion.
   * @returns {Observable<ConfirmSignUpModel>}
   */
  public confirm(params: ConfirmSignUpInput): Observable<ConfirmSignUpModel> {
    return this.useCase.execute(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in confirm sign up';

        return throwError(() => new Error(message));
      }),
    );
  }
}
