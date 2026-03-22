import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IConfirmSignUpRepository, IPostConfirmSignUpUseCase } from '@/app/application';

import type { ConfirmSignUpModel } from '@/app/domain';
import type { ConfirmSignUpInput } from 'aws-amplify/auth';
import { inject } from '@angular/core';

/**
 * @class PostConfirmSignUpUseCase
 * @version 1.1.0
 * @description
 * Caso de uso que orquesta la confirmacion de registro.
 */
export class PostConfirmSignUpUseCase extends IPostConfirmSignUpUseCase {
  private readonly repository = inject(IConfirmSignUpRepository);

  /**
   * @method execute
   * @description Ejecuta la confirmacion validando los datos de entrada.
   * @param {ConfirmSignUpInput} params Datos de confirmacion.
   * @returns {Observable<ConfirmSignUpModel>}
   */
  public execute(params: ConfirmSignUpInput): Observable<ConfirmSignUpModel> {
    if (!params.username?.trim() || !params.confirmationCode?.trim()) {
      return throwError(() => new Error('Username and confirmation code are required'));
    }

    return this.repository.confirm(params).pipe(
      map((response) => response),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in confirm sign up';

        return throwError(() => new Error(message));
      }),
    );
  }
}
