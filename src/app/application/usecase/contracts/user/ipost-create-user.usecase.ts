import type { Observable } from 'rxjs';
import type { SignUpParametersEntity } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class ICreateUserUseCase
 * @version 1.0.0
 * @description
 * Contrato del caso de uso para crear usuario.
 */
export abstract class ICreateUserUseCase {
  /**
   * @method execute
   * @description Ejecuta la creacion del usuario.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>}
   */
  abstract execute(params: SignUpParametersEntity, info: SignUpOutput): Observable<string>;
}
