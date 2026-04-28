import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { SignInOutput } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';

import type { ISignInAdapter } from '@/app/application';
import type { SignInParametersEntity, SignInResponseEntity } from '@/app/domain';
import { errorMessageStringUtil, SignUpStepEnum } from '@/app/domain';

/**
 * @class SignInAdapter
 * @version 1.1.1
 * @author Steveen Ordonez
 * @description
 * Adaptador de infraestructura que implementa el inicio de sesion mediante AWS Amplify.
 * Transforma promesas en flujos reactivos usando Observables.
 */
export class SignInAdapter implements ISignInAdapter {
  /**
   * @method signIn
   * @description Realiza la autenticacion del usuario en AWS Cognito.
   * @param {SignInParametersEntity} params Credenciales del usuario.
   * @returns {Observable<SignInResponseEntity>} Flujo con la respuesta de autenticacion.
   * @throws {Error} Error mapeado si la operacion falla.
   */
  public signIn(params: SignInParametersEntity): Observable<SignInResponseEntity> {
    return from(
      signIn({
        username: params.email,
        password: params.password,
        options: {
          authFlowType: SignUpStepEnum.USER_PASSWORD_AUTH,
        },
      }),
    ).pipe(
      map((response: SignInOutput) => ({
        success: true,
        SignInOutput: response,
      })),
      catchError((error) => {
        const errorMessage = errorMessageStringUtil(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
