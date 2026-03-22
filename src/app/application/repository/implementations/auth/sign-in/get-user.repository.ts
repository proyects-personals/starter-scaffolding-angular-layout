import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';

import type { UserModel } from '@/app/domain';
import type { IGetUserRepository } from '@/app/application';
import { IGetUserAdapter, GetUserMapper } from '@/app/application';

/**
 * @class GetUserRepository
 * @version 1.1.1
 * @author Steveen Ordoñez
 * @description
 * Implementación del repositorio para la obtención del usuario actual.
 * Actúa como puente entre el adaptador de infraestructura y el modelo de dominio.
 */
export class GetUserRepository implements IGetUserRepository {
  private readonly adapter = inject(IGetUserAdapter);
  private readonly mapper = new GetUserMapper();

  /**
   * @method getCurrentUser
   * @description
   * Recupera los datos del usuario desde el adaptador y los transforma
   * mediante el mapper correspondiente.
   * @returns {Observable<UserModel | undefined>} Flujo reactivo con el modelo de dominio.
   */
  public getCurrentUser(): Observable<UserModel | undefined> {
    return this.adapter.fetch().pipe(
      map((entity) => (entity ? this.mapper.toModel(entity) : undefined)),
      catchError((error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Error desconocido al obtener el usuario';

        return throwError(() => new Error(message));
      }),
    );
  }
}
