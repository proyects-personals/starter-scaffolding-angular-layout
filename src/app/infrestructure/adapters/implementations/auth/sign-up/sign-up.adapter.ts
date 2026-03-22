import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { SignUpOutput } from 'aws-amplify/auth';
import { signUp } from 'aws-amplify/auth';

import type { ISignUpAdapter } from '@/app/application';
import type { SignUpResponseEntity, SignUpParametersEntity } from '@/app/domain';
import { errorMessageStringUtil } from '@/app/domain';

/**
 * @class SignUpAdapter
 * @version 1.1.0
 * @author Steveen Ordonez
 * @description
 * Adaptador de infraestructura que implementa el registro de usuarios mediante AWS Amplify.
 * Convierte promesas en flujos reactivos usando Observables.
 */
export class SignUpAdapter implements ISignUpAdapter {
  /**
   * @method signUp
   * @description Realiza el registro de un usuario en AWS Cognito.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @returns {Observable<SignUpResponseEntity>} Flujo con la respuesta del registro.
   * @throws {Error} Error mapeado si la operacion falla.
   */
  public signUp(params: SignUpParametersEntity): Observable<SignUpResponseEntity> {
    return from(
      signUp({
        username: params.email,
        password: params.password,
        options: {
          userAttributes: {
            email: params.email,
            'custom:role': params.role,
            'custom:nombre': params.nombres,
            'custom:apellido': params.apellidos,
            'custom:telefono': params.telefono,
            'custom:cedula': params.cedula,
            'custom:terminos': params.terminos.toString(),
          },
          autoSignIn: true,
        },
      }),
    ).pipe(
      map((response: SignUpOutput) => ({
        success: true,
        SignUpOutput: response,
      })),
      catchError((error) => {
        const errorMessage = errorMessageStringUtil(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
