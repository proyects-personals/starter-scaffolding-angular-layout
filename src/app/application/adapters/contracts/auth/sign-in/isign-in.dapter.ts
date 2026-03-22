import type { Observable } from 'rxjs';
import type { SignInParametersEntity, SignInResponseEntity } from '@/app/domain';

/**
 * @class ISignInAdapter
 * @version 1.0.0
 * @description
 * Interfaz para el adaptador de inicio de sesion.
 * Define el contrato que debe cumplir cualquier implementacion de autenticacion.
 */
export abstract class ISignInAdapter {
  /**
   * @method signIn
   * @description Inicia sesion con las credenciales del usuario.
   * @param {SignInParametersEntity} params Credenciales del usuario.
   * @returns {Observable<SignInResponseEntity>} Flujo reactivo con la respuesta del inicio de sesion.
   */
  abstract signIn(params: SignInParametersEntity): Observable<SignInResponseEntity>;
}
