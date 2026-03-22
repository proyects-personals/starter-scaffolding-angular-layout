import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import type { IGetUserUseCase } from '@/app/application';
import { IGetUserRepository } from '@/app/application';
import type { UserModel } from '@/app/domain';
import { inject } from '@angular/core';

/**
 * @class GetUserUseCase
 * @version 1.1.0
 * @description
 * Caso de uso que obtiene la informacion del usuario autenticado.
 */
export class GetUserUseCase implements IGetUserUseCase {
  private readonly userRepository = inject(IGetUserRepository);

  /**
   * @method execute
   * @description Ejecuta la obtencion del usuario y valida los datos.
   * @returns {Observable<UserModel | undefined>}
   */
  public execute(): Observable<UserModel | undefined> {
    return this.userRepository.getCurrentUser().pipe(
      map((user) => {
        if (!user) return undefined;

        if (!user.email || !user.id || !user.role) {
          return undefined;
        }

        return user;
      }),
      catchError(() => of(undefined)),
    );
  }
}
