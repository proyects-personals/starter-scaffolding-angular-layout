import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ICreateUserUseCase, IUserRepository } from '@/app/application';

import type { SignUpParametersEntity } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class CreateUserUseCase
 * @version 1.1.0
 * @description
 * Caso de uso encargado de crear un usuario en la base de datos.
 */
export class CreateUserUseCase extends ICreateUserUseCase {
  private readonly repository = inject(IUserRepository);

  /**
   * @method execute
   * @description Ejecuta la creacion del usuario.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>}
   */
  public execute(params: SignUpParametersEntity, info: SignUpOutput): Observable<string> {
    return this.repository.createUser(params, info).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error creating user';

        return throwError(() => new Error(message));
      }),
    );
  }
}
