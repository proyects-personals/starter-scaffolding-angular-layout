import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';

import { IConfirmSignInRepository, IPostConfirmSignInUseCase } from '@/app/application';

import type { ConfirmSignInModel, ConfirmSignInInputEntity } from '@/app/domain';

/**
 * @class PostConfirmSignInUseCase
 * @version 1.0.0
 * @description
 * Caso de uso que orquesta la confirmación de inicio de sesión
 * con cambio de contraseña.
 */
export class PostConfirmSignInUseCase extends IPostConfirmSignInUseCase {
  private readonly repository = inject(IConfirmSignInRepository);

  /**
   * Ejecuta la confirmación validando los datos de entrada.
   * @param params Datos requeridos (password + atributos)
   * @returns Observable con el modelo de dominio
   */
  public execute(params: ConfirmSignInInputEntity): Observable<ConfirmSignInModel> {
    if (!params.newPassword?.trim()) {
      return throwError(() => new Error('Password is required'));
    }

    if (!params.attributes?.username?.trim()) {
      return throwError(() => new Error('Username is required'));
    }

    return this.repository.confirm(params).pipe(
      map((response) => response),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in confirm sign in';

        return throwError(() => new Error(message));
      }),
    );
  }
}
