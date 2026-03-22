import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { generateClient } from 'aws-amplify/api';
import type { GraphQLResult } from '@aws-amplify/api';
import type { SignUpOutput } from 'aws-amplify/auth';

import type { IUserAdapter } from '@/app/application';
import type { CreateUserEntity, CreateUserMutationResponse } from '@/app/domain';
import { CreateUserMutation, createUserVariables } from '@/app/domain';

/**
 * @class UserAdapter
 * @version 1.2.2
 * @author Steveen Ordonez
 * @description
 * Adaptador de infraestructura para AppSync.
 * Se elimina el uso de 'as' para cumplir con la regla 'consistent-type-assertions'.
 */
export class UserAdapter implements IUserAdapter {
  private readonly client = generateClient();

  /**
   * @method createUser
   * @description Crea un usuario usando tipado de genéricos nativo de Amplify.
   */
  public createUser(entity: CreateUserEntity, info: SignUpOutput): Observable<string> {
    const variables = createUserVariables(entity, info);

    return from(
      this.client.graphql<CreateUserMutationResponse>({
        query: CreateUserMutation,
        variables,
      }),
    ).pipe(
      map((response: GraphQLResult<CreateUserMutationResponse>) => {
        const data = response.data;

        if (!data?.createUsuarios?.id) {
          throw new Error('La respuesta de GraphQL no contiene el ID del usuario esperado.');
        }

        return data.createUsuarios.id;
      }),
      catchError((error: unknown) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Error desconocido al crear el usuario en AppSync';

        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
