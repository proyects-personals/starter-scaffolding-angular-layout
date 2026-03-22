import type { Observable } from 'rxjs';
import type { SignInModel } from '@/app/domain';

/**
 * @class ISignInInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para inicio de sesion.
 */
export abstract class ISignInInteractor {
  /**
   * @method signIn
   * @description Ejecuta el inicio de sesion.
   * @param {{ email: string; password: string }} params Credenciales.
   * @returns {Observable<SignInModel>}
   */
  abstract signIn(params: { email: string; password: string }): Observable<SignInModel>;
}
