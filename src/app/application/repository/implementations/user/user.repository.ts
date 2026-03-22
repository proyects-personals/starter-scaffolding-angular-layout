import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';
import type { SignUpOutput } from 'aws-amplify/auth';

import type { SignUpParametersEntity } from '@/app/domain';
import type { IUserRepository } from '@/app/application';
import { IUserAdapter, UserMapper } from '@/app/application';

/**
 * @class UserRepository
 * @version 1.1.0
 * @description
 * Orquesta la creacion de usuarios entre el dominio y la persistencia.
 * Utiliza mapper instanciado para transformar los datos.
 */
export class UserRepository implements IUserRepository {
  private readonly adapter = inject(IUserAdapter);
  private readonly mapper = new UserMapper();

  /**
   * @method createUser
   * @description Ejecuta la creacion del usuario en la base de datos.
   * @param {SignUpParametersEntity} params Datos del registro.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>} Flujo reactivo con el id generado.
   */
  public createUser(params: SignUpParametersEntity, info: SignUpOutput): Observable<string> {
    const entity = this.mapper.toCreateEntity(params);

    return this.adapter.createUser(entity, info).pipe(
      map((id) => id),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error creating user';

        return throwError(() => new Error(message));
      }),
    );
  }
}
