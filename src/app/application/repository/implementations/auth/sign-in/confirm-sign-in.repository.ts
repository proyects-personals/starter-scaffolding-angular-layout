import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';

import type { ConfirmSignInInputEntity, ConfirmSignInModel } from '@/app/domain';
import type { IConfirmSignInRepository } from '@/app/application';
import { IConfirmSignInAdapter, ConfirmSignInMapper } from '@/app/application';

/**
 * @class ConfirmSignInRepository
 * @version 1.0.0
 * @description
 * Orquesta la confirmación de inicio de sesión (cambio de contraseña)
 * entre el adapter y el dominio.
 */
export class ConfirmSignInRepository implements IConfirmSignInRepository {
  private readonly adapter = inject(IConfirmSignInAdapter);
  private readonly mapper = new ConfirmSignInMapper();

  /**
   * Ejecuta la confirmación de sign-in y transforma la respuesta a modelo de dominio.
   * @param params Datos necesarios (password + atributos)
   * @returns Observable con el modelo de dominio
   */
  public confirm(params: ConfirmSignInInputEntity): Observable<ConfirmSignInModel> {
    return this.adapter.confirmSignIn(params).pipe(
      map((response) => this.mapper.toModel(response)),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in confirm sign in';

        return throwError(() => new Error(message));
      }),
    );
  }
}
