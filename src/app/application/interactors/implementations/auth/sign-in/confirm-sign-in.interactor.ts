import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { IConfirmSignInInteractor } from '@/app/application';
import { IPostConfirmSignInUseCase } from '@/app/application';

import type { ConfirmSignInModel, ConfirmSignInInputEntity } from '@/app/domain';

/**
 * @class ConfirmSignInInteractor
 * @description
 * Interactor que expone la confirmación de inicio de sesión
 * hacia la capa de presentación.
 */
export class ConfirmSignInInteractor implements IConfirmSignInInteractor {
  private readonly useCase = inject(IPostConfirmSignInUseCase);

  /**
   * Ejecuta el flujo de confirmación de sign-in.
   * @param params Datos de entrada (password + atributos)
   * @returns Observable con el modelo de dominio
   */
  public confirm(params: ConfirmSignInInputEntity): Observable<ConfirmSignInModel> {
    return this.useCase.execute(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in confirm sign in';

        return throwError(() => new Error(message));
      }),
    );
  }
}
