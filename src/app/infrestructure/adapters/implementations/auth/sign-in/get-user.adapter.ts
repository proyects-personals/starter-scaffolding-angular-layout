import type { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { FetchUserAttributesOutput } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';

import type { IGetUserAdapter } from '@/app/application';
import { mapRoleStringToEnum, UserEntity } from '@/app/domain';

/**
 * @class GetUserAdapter
 * @version 1.1.0
 * @description
 * Adaptador de infraestructura que obtiene los atributos del usuario mediante AWS Amplify.
 * Convierte promesas en flujos reactivos usando Observables.
 */
export class GetUserAdapter implements IGetUserAdapter {
  /**
   * @method fetch
   * @description Obtiene los atributos del usuario autenticado desde Cognito.
   * @returns {Observable<UserEntity | undefined>} Flujo con la entidad del usuario.
   */
  public fetch(): Observable<UserEntity | undefined> {
    return from(fetchUserAttributes()).pipe(
      map(
        (userAttributes: FetchUserAttributesOutput) =>
          new UserEntity(
            userAttributes.email ?? '',
            userAttributes.email_verified === 'true',
            userAttributes['custom:nombre'] ?? '',
            userAttributes['custom:apellido'] ?? '',
            mapRoleStringToEnum(userAttributes['custom:role']),
            userAttributes['custom:telefono'] ?? '',
            userAttributes.sub ?? '',
          ),
      ),
      catchError(() => {
        return of(undefined);
      }),
    );
  }
}
