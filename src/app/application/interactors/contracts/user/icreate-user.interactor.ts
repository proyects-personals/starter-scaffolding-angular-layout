import type { Observable } from 'rxjs';
import type { SignUpParametersEntity } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class ICreateUserInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para crear usuario.
 */
export abstract class ICreateUserInteractor {
  /**
   * @method create
   * @description Ejecuta la creacion de usuario.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>}
   */
  abstract create(params: SignUpParametersEntity, info: SignUpOutput): Observable<string>;
}
