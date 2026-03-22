import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { ICreateUserInteractor } from '@/app/application';
import { ICreateUserUseCase } from '@/app/application';

import type { SignUpParametersEntity } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class CreateUserInteractor
 * @version 1.1.0
 * @description
 * Interactor que expone la creacion de usuario hacia la capa de presentacion.
 */
export class CreateUserInteractor implements ICreateUserInteractor {
  private readonly useCase = inject(ICreateUserUseCase);

  /**
   * @method create
   * @description Ejecuta el flujo de creacion de usuario.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>}
   */
  public create(params: SignUpParametersEntity, info: SignUpOutput): Observable<string> {
    return this.useCase.execute(params, info).pipe(
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error creating user';

        return throwError(() => new Error(message));
      }),
    );
  }
}
