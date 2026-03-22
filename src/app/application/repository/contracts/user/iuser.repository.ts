import type { Observable } from 'rxjs';
import type { SignUpParametersEntity } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class IUserRepository
 * @version 1.0.0
 * @description
 * Contrato del repositorio de usuarios.
 * Coordina los casos de uso con la persistencia.
 */
export abstract class IUserRepository {
  /**
   * @method createUser
   * @description Crea un usuario y devuelve su identificador.
   * @param {SignUpParametersEntity} params Datos del registro.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>} Flujo reactivo con el id generado.
   */
  abstract createUser(params: SignUpParametersEntity, info: SignUpOutput): Observable<string>;
}
