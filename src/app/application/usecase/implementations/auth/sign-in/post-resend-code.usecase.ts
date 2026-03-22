import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPostResendCodeUseCase, IResendCodeRepository } from '@/app/application';

import type { ResendCodeModel } from '@/app/domain';

/**
 * @class PostResendCodeUseCase
 * @version 1.1.0
 * @description
 * Caso de uso que valida el username y ejecuta el reenvio de codigo.
 */
export class PostResendCodeUseCase extends IPostResendCodeUseCase {
  private readonly repository = inject(IResendCodeRepository);

  /**
   * @method execute
   * @description Ejecuta el reenvio del codigo validando parametros.
   * @param {string} username Identificador del usuario.
   * @returns {Observable<ResendCodeModel>}
   */
  public execute(username: string): Observable<ResendCodeModel> {
    this.validateParams(username);

    return this.repository.resend(username).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in resend code';

        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * @method validateParams
   * @description Valida el username.
   * @param {string} username Identificador del usuario.
   */
  private validateParams(username: string): void {
    if (!username || username.trim() === '') {
      throw new Error('Username is required to resend code');
    }
  }
}
