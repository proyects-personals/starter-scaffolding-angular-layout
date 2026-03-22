import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { ResetPasswordInput, ResetPasswordOutput } from 'aws-amplify/auth';
import { resetPassword } from 'aws-amplify/auth';

import type { IResetPasswordAdapter } from '@/app/application';
import { errorMessageStringUtil } from '@/app/domain';

/**
 * @class ResetPasswordAdapter
 * @version 1.1.0
 * @author Steveen Ordonez
 * @description
 * Adaptador de infraestructura que gestiona el reenvio de codigo de recuperacion mediante AWS Amplify.
 * Convierte promesas en flujos reactivos usando Observables.
 */
export class ResetPasswordAdapter implements IResetPasswordAdapter {
  /**
   * @method resendPassword
   * @description Solicita el reenvio del codigo de recuperacion desde AWS Cognito.
   * @param {ResetPasswordInput} params Datos del usuario.
   * @returns {Observable<ResetPasswordOutput>} Flujo con la respuesta del servicio.
   * @throws {Error} Error mapeado si la operacion falla.
   */
  public resendPassword(params: ResetPasswordInput): Observable<ResetPasswordOutput> {
    return from(
      resetPassword({
        username: params.username,
      }),
    ).pipe(
      map((response: ResetPasswordOutput) => response),
      catchError((error) => {
        const errorMessage = errorMessageStringUtil(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
