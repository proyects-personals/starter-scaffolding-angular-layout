import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import type { ConfirmSignInOutput } from 'aws-amplify/auth';
import { confirmSignIn } from 'aws-amplify/auth';
import type { IConfirmSignInAdapter } from '@/app/application';
import type { ConfirmSignInInputEntity } from '@/app/domain';
import { errorMessageStringUtil } from '@/app/domain';
import { getCurrentUser } from 'aws-amplify/auth';

/**
 * @class ConfirmSignInAdapter
 * @version 1.0.0
 * @author Steveen Ordonez
 * @description
 * Adaptador que gestiona el flujo de confirmación de inicio de sesión
 * con cambio de contraseña (NEW_PASSWORD_REQUIRED) usando AWS Amplify.
 */
export class ConfirmSignInAdapter implements IConfirmSignInAdapter {
  /**
   * Confirma el inicio de sesión enviando la nueva contraseña
   * requerida por el challenge de Cognito (NEW_PASSWORD_REQUIRED).
   *
   * @param params Datos necesarios para la confirmación (password + atributos)
   * @returns Observable con la respuesta de AWS Amplify
   * @throws Error mapeado en caso de fallo
   */
  public confirmSignIn(params: ConfirmSignInInputEntity): Observable<ConfirmSignInOutput> {
    return from(
      confirmSignIn({
        challengeResponse: params.newPassword,
        options: { userAttributes: params.attributes },
      }),
    ).pipe(
      switchMap((response: ConfirmSignInOutput) =>
        from(getCurrentUser()).pipe(map(() => response)),
      ),
      catchError((error) => {
        const errorMessage = errorMessageStringUtil(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
