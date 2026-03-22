import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fetchAuthSession } from 'aws-amplify/auth';
import { inject } from '@angular/core';

import type { SignInModel, SignInParametersEntity, SignInResponseEntity } from '@/app/domain';

import type { ISignInRepository } from '@/app/application';
import { ISignInAdapter, SignInMapper } from '@/app/application';

/**
 * @class SignInRepository
 * @version 1.2.0
 * @description
 * Orquesta el inicio de sesion entre el adapter y el dominio.
 * Utiliza mapper instanciado y maneja la obtencion de tokens.
 */
export class SignInRepository implements ISignInRepository {
  private readonly adapter = inject(ISignInAdapter);
  private readonly mapper = new SignInMapper();

  /**
   * @method getTokens
   * @description Obtiene los tokens de sesion desde AWS Cognito.
   * @returns {Observable<void>} Flujo que completa al almacenar los tokens.
   */
  private getTokens(): Observable<void> {
    return from(fetchAuthSession({ forceRefresh: true })).pipe(
      map((session) => {
        if (session.tokens?.accessToken && session.tokens.idToken) {
          localStorage.setItem('accessToken', session.tokens.accessToken.toString());
          localStorage.setItem('idToken', session.tokens.idToken.toString());
        }
      }),
    );
  }

  /**
   * @method signIn
   * @description Ejecuta el inicio de sesion y transforma la respuesta.
   * @param {SignInParametersEntity} params Credenciales del usuario.
   * @returns {Observable<SignInModel>} Flujo reactivo con el modelo de dominio.
   */
  public signIn(params: SignInParametersEntity): Observable<SignInModel> {
    return this.adapter.signIn(params).pipe(
      map((response: SignInResponseEntity) => this.mapper.toModel(response)),
      switchMap((model) => this.getTokens().pipe(map(() => model))),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error in sign in';

        return throwError(() => new Error(message));
      }),
    );
  }
}
