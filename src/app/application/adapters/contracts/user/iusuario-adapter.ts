import type { Observable } from 'rxjs';
import type { CreateUserEntity } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class IUserAdapter
 * @version 1.0.0
 * @description
 * Interfaz para el adaptador de persistencia de usuario.
 * Define el contrato para guardar usuarios en base de datos.
 */
export abstract class IUserAdapter {
  /**
   * @method createUser
   * @description Inserta un usuario en la base de datos.
   * @param {CreateUserEntity} entity Datos del usuario.
   * @param {SignUpOutput} info Informacion de autenticacion.
   * @returns {Observable<string>} Flujo con el id del usuario creado.
   */
  abstract createUser(entity: CreateUserEntity, info: SignUpOutput): Observable<string>;
}
