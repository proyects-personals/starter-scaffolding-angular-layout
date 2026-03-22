import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { IGetUserInteractor } from '@/app/application';
import { IGetUserUseCase } from '@/app/application';

import type { UserModel } from '@/app/domain';

/**
 * @class GetUserInteractor
 * @version 1.1.0
 * @description
 * Interactor encargado de obtener el usuario autenticado.
 */
export class GetUserInteractor implements IGetUserInteractor {
  private readonly useCase = inject(IGetUserUseCase);

  /**
   * @method getCurrentUser
   * @description Obtiene el usuario actual.
   * @returns {Observable<UserModel | undefined>}
   */
  public getCurrentUser(): Observable<UserModel | undefined> {
    return this.useCase.execute().pipe(
      catchError((error: unknown) => {
        console.error('Error getting user', error);
        return of(undefined);
      }),
    );
  }
}
