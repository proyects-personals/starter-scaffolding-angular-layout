import type { Observable } from 'rxjs';
import type { SignInModel, SignInParametersEntity } from '@/app/domain';

/**
 * @class ISignInRepository
 * @version 1.0.0
 * @description
 * Interfaz que define el contrato para el inicio de sesion.
 * Garantiza un modelo de dominio consistente.
 */
export abstract class ISignInRepository {
  /**
   * @method signIn
   * @description Ejecuta el inicio de sesion y devuelve el modelo de dominio.
   * @param {SignInParametersEntity} params Credenciales del usuario.
   * @returns {Observable<SignInModel>} Flujo reactivo con el modelo de dominio.
   */
  abstract signIn(params: SignInParametersEntity): Observable<SignInModel>;
}
