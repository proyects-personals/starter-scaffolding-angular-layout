import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { ISignInInteractor } from '@/app/application';
import { IPostSignInUseCase } from '@/app/application';

import type { SignInModel } from '@/app/domain';

/**
 * @class SignInInteractor
 * @version 1.1.0
 * @description
 * Interactor que expone el inicio de sesion hacia la capa de presentacion.
 */
export class SignInInteractor implements ISignInInteractor {
  private readonly useCase = inject(IPostSignInUseCase);

  /**
   * @method signIn
   * @description Ejecuta el flujo de inicio de sesion.
   * @param {{ email: string; password: string }} params Credenciales.
   * @returns {Observable<SignInModel>}
   */
  public signIn(params: { email: string; password: string }): Observable<SignInModel> {
    return this.useCase.execute(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in sign in';

        return throwError(() => new Error(message));
      }),
    );
  }
}
