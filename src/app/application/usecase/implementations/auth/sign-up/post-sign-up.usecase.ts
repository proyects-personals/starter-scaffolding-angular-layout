import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPostSignUpUseCase, ISignUpRepository } from '@/app/application';
import type { SignUpModel, SignUpParametersEntity } from '@/app/domain';
import { RoleEnum, SIGN_UP_CONFIG } from '@/app/domain';

/**
 * @class PostSignUpUseCase
 * @version 1.1.1
 * @author Steveen Ordoñez
 * @description
 * Caso de uso que orquesta el registro de nuevos usuarios en el sistema.
 * Aplica reglas de negocio estrictas antes de persistir la información.
 */
export class PostSignUpUseCase extends IPostSignUpUseCase {
  private readonly repository = inject(ISignUpRepository);

  /**
   * @method execute
   * @description Valida los parámetros de entrada y ejecuta la acción de registro.
   * @param {SignUpParametersEntity} params - Datos del formulario de registro.
   * @returns {Observable<SignUpModel>} Flujo con la información del usuario registrado.
   */
  public execute(params: SignUpParametersEntity): Observable<SignUpModel> {
    try {
      this.validateParams(params);

      return this.repository.register(params).pipe(
        catchError((error: unknown) => {
          const message =
            error instanceof Error ? error.message : 'Error desconocido durante el registro';
          return throwError(() => new Error(message));
        }),
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  /**
   * @method validateParams
   * @description Realiza validaciones de formato y longitud sobre los datos de entrada.
   * @param {SignUpParametersEntity} params - Entidad de parámetros de registro.
   * @throws {Error} Si algún campo no cumple con las reglas de negocio.
   */
  private validateParams(params: SignUpParametersEntity): void {
    if (!params) {
      throw new Error('Faltan los parámetros de registro.');
    }

    if (!params.email?.includes('@')) {
      throw new Error('El correo electrónico no es válido.');
    }

    if (!params.password || params.password.length < SIGN_UP_CONFIG.MIN_PASSWORD_LENGTH) {
      throw new Error(
        `La contraseña debe tener al menos ${SIGN_UP_CONFIG.MIN_PASSWORD_LENGTH} caracteres.`,
      );
    }

    if (!params.nombres || params.nombres.length < SIGN_UP_CONFIG.MIN_NAME_LENGTH) {
      throw new Error('El nombre es demasiado corto.');
    }

    if (!params.apellidos || params.apellidos.length < SIGN_UP_CONFIG.MIN_NAME_LENGTH) {
      throw new Error('El apellido es demasiado corto.');
    }

    if (!params.telefono || params.telefono.length < SIGN_UP_CONFIG.MIN_PHONE_LENGTH) {
      throw new Error('El número de teléfono no es válido.');
    }

    const validRoles: RoleEnum[] = [RoleEnum.DOCENTES, RoleEnum.ESTUDIANTES];
    if (!params.role || !validRoles.includes(params.role)) {
      throw new Error('El rol seleccionado no es válido.');
    }
  }
}
