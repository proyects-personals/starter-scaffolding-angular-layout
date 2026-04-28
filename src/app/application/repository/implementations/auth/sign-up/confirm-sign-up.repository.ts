import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { ConfirmSignUpInput } from 'aws-amplify/auth';
import { inject } from '@angular/core';

import type { ConfirmSignUpModel } from '@/app/domain';
import type { IConfirmSignUpRepository } from '@/app/application';
import { IConfirmSignUpAdapter, ConfirmSignUpMapper } from '@/app/application';

/**
 * @class ConfirmSignUpRepository
 * @version 1.2.0
 * @description
 * Orquesta la confirmacion de registro entre el adapter y el dominio.
 * Utiliza una instancia de mapper para transformar la respuesta.
 */
export class ConfirmSignUpRepository implements IConfirmSignUpRepository {
  private readonly adapter = inject(IConfirmSignUpAdapter);
  private readonly mapper = new ConfirmSignUpMapper();

  /**
   * @method confirm
   * @description Ejecuta la confirmacion de registro y transforma la respuesta.
   * @param {ConfirmSignUpInput} params Datos de confirmacion.
   * @returns {Observable<ConfirmSignUpModel>} Flujo reactivo con el modelo de dominio.
   */
  public confirm(params: ConfirmSignUpInput): Observable<ConfirmSignUpModel> {
    return this.adapter.confirmSignUp(params).pipe(
      map((response) => this.mapper.toModel(response)),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in confirm sign up';

        return throwError(() => new Error(message));
      }),
    );
  }
}
