import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { inject } from '@angular/core';

import type { SignUpModel, SignUpParametersEntity } from '@/app/domain';
import type { ISignUpRepository } from '@/app/application';
import { IUserRepository, ISignUpAdapter, SignUpMapper } from '@/app/application';

/**
 * @class SignInRepository
 * @version 1.1.0
 * @description
 * Orquesta el registro de usuario entre AWS Cognito y la base de datos.
 * Ejecuta:
 * 1. Registro en Cognito
 * 2. Persistencia en DB
 * 3. Mapeo a modelo de dominio
 */
export class SignupRepository implements ISignUpRepository {
  private readonly adapter = inject(ISignUpAdapter);
  private readonly userRepository = inject(IUserRepository);
  private readonly mapper = new SignUpMapper();

  /**
   * @method register
   * @description Ejecuta el flujo completo de registro.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @returns {Observable<SignUpModel>}
   */
  public register(params: SignUpParametersEntity): Observable<SignUpModel> {
    return this.adapter.signUp(params).pipe(
      switchMap((response) =>
        this.userRepository
          .createUser(params, response.SignUpOutput)
          .pipe(map(() => this.mapper.toModel(response))),
      ),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in register flow';

        return throwError(() => new Error(message));
      }),
    );
  }
}
