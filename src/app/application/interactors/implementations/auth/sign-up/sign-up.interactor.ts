import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { ISignUpInteractor } from '@/app/application';
import { IPostSignUpUseCase } from '@/app/application';

import type { SignUpModel, SignUpParametersEntity } from '@/app/domain';

/**
 * @class SignUpInteractor
 * @version 1.1.0
 * @description
 * Interactor que expone el registro hacia la capa de presentacion.
 */
export class SignUpInteractor implements ISignUpInteractor {
  private readonly useCase = inject(IPostSignUpUseCase);

  /**
   * @method register
   * @description Ejecuta el flujo de registro.
   * @param {SignUpParametersEntity} params Datos de registro.
   * @returns {Observable<RegisterModel>}
   */
  public register(params: SignUpParametersEntity): Observable<SignUpModel> {
    return this.useCase.execute(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in register';

        return throwError(() => new Error(message));
      }),
    );
  }
}
