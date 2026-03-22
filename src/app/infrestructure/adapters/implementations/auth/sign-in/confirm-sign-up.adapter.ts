import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { ConfirmSignUpInput, ConfirmSignUpOutput } from 'aws-amplify/auth';
import { confirmSignUp } from 'aws-amplify/auth';
import type { IConfirmSignUpAdapter } from '@/app/application';
import { errorMessageStringUtil } from '@/app/domain';

/**
 * @class ConfirmSignUpAdapter
 * @version 1.1.0
 * @author Steveen Ordonez
 * @description
 * Adaptador de infraestructura que implementa la confirmacion de registro mediante AWS Amplify.
 * Transforma las promesas nativas del SDK en flujos reactivos usando Observables.
 */
export class ConfirmSignUpAdapter implements IConfirmSignUpAdapter {
  /**
   * @method confirmSignUp
   * @description Realiza la llamada asincrona a Cognito para validar el codigo de registro.
   * @param {ConfirmSignUpInput} params - Objeto con username y el codigo enviado al correo.
   * @returns {Observable<ConfirmSignUpOutput>} Flujo con la respuesta exitosa de AWS.
   * @throws {Error} Error mapeado mediante el utilitario de dominio si la operacion falla.
   */
  public confirmSignUp(params: ConfirmSignUpInput): Observable<ConfirmSignUpOutput> {
    return from(
      confirmSignUp({ username: params.username, confirmationCode: params.confirmationCode }),
    ).pipe(
      map((response: ConfirmSignUpOutput) => response),
      catchError((error) => {
        const errorMessage = errorMessageStringUtil(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
