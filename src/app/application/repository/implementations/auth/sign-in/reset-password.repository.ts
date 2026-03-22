import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';
import type { ResetPasswordInput } from 'aws-amplify/auth';

import type { ResetPasswordModel } from '@/app/domain';
import type { IResetPasswordRepository } from '@/app/application';
import { IResetPasswordAdapter, ResetPasswordMapper } from '@/app/application';

/**
 * @class ResetPasswordRepository
 * @version 1.1.0
 * @description
 * Orquesta la comunicacion entre el adapter y el dominio.
 * Utiliza mapper instanciado para transformar la respuesta.
 */
export class ResetPasswordRepository implements IResetPasswordRepository {
  private readonly adapter = inject(IResetPasswordAdapter);
  private readonly mapper = new ResetPasswordMapper();

  /**
   * @method resend
   * @description Ejecuta el reenvio del codigo y transforma la respuesta.
   * @param {ResetPasswordInput} params Datos del usuario.
   * @returns {Observable<ResetPasswordModel>} Flujo reactivo con el resultado.
   */
  public resend(params: ResetPasswordInput): Observable<ResetPasswordModel> {
    return this.adapter.resendPassword(params).pipe(
      map((response) => this.mapper.toModel(response)),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in reset password';

        return throwError(() => new Error(message));
      }),
    );
  }
}
