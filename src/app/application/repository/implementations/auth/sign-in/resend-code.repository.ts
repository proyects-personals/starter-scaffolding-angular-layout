import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';

import type { ResendCodeModel } from '@/app/domain';
import type { IResendCodeRepository } from '@/app/application';
import { IResendCodeAdapter, ResendCodeMapper } from '@/app/application';

/**
 * @class ResendCodeRepository
 * @version 1.1.0
 * @description
 * Orquesta la comunicacion entre el adapter y el dominio.
 * Utiliza mapper instanciado para transformar los datos.
 */
export class ResendCodeRepository implements IResendCodeRepository {
  private readonly adapter = inject(IResendCodeAdapter);
  private readonly mapper = new ResendCodeMapper();

  /**
   * @method resend
   * @description Ejecuta el reenvio del codigo y transforma la respuesta.
   * @param {string} username Correo o identificador del usuario.
   * @returns {Observable<ResendCodeModel>} Flujo reactivo con el resultado.
   */
  public resend(username: string): Observable<ResendCodeModel> {
    return this.adapter.resendCode(username).pipe(
      map((entity) => this.mapper.toModel(entity)),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in resend code';

        return throwError(() => new Error(message));
      }),
    );
  }
}
