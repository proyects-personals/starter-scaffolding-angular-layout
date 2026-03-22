import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { resendSignUpCode } from 'aws-amplify/auth';

import type { IResendCodeAdapter } from '@/app/application';
import type { ResendCodeEntity } from '@/app/domain';
import { errorMessageStringUtil } from '@/app/domain';

/**
 * @class ResendCodeAdapter
 * @version 1.1.0
 * @description
 * Adaptador de infraestructura que implementa el reenvio de codigo mediante AWS Amplify.
 * Transforma promesas en flujos reactivos usando Observables.
 */
export class ResendCodeAdapter implements IResendCodeAdapter {
  /**
   * @method resendCode
   * @description Reenvia el codigo de confirmacion desde AWS Cognito.
   * @param {string} username Identificador del usuario.
   * @returns {Observable<ResendCodeEntity>} Flujo con la informacion del envio.
   * @throws {Error} Error mapeado si la operacion falla.
   */
  public resendCode(username: string): Observable<ResendCodeEntity> {
    return from(resendSignUpCode({ username })).pipe(
      map(({ destination, deliveryMedium, attributeName }) => ({
        destination: destination ?? null,
        deliveryMedium: deliveryMedium ?? null,
        attributeName: attributeName ?? null,
      })),
      catchError((error) => {
        const errorMessage = errorMessageStringUtil(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
