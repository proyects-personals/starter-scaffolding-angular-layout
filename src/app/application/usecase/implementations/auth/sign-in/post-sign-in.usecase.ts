import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPostSignInUseCase, ISignInRepository } from '@/app/application';

import type { SignInModel } from '@/app/domain';
import { SIGN_UP_CONFIG } from '@/app/domain';

/**
 * @class PostSignInUseCase
 * @version 1.1.0
 * @description
 * Caso de uso que orquesta el inicio de sesion.
 */
export class PostSignInUseCase extends IPostSignInUseCase {
  private readonly repository = inject(ISignInRepository);

  /**
   * @method execute
   * @description Ejecuta el inicio de sesion validando parametros.
   * @param {{ email: string; password: string }} params Credenciales.
   * @returns {Observable<SignInModel>}
   */
  public execute(params: { email: string; password: string }): Observable<SignInModel> {
    this.validateParams(params);

    return this.repository.signIn(params).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in sign in';

        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * @method validateParams
   * @description Validaciones basicas de entrada.
   * @param params Credenciales.
   */
  private validateParams(params: { email: string; password: string }): void {
    if (!params) {
      throw new Error('Missing parameters');
    }

    if (!params.email?.includes('@')) {
      throw new Error('Invalid email');
    }

    if (!params.password || params.password.length < SIGN_UP_CONFIG.MIN_PASSWORD_LENGTH) {
      throw new Error('Invalid password (min 8 characters)');
    }
  }
}
