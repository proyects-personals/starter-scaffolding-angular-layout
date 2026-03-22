import type { Observable } from 'rxjs';
import type { SignInModel } from '@/app/domain';

/**
 * @class IPostSignInUseCase
 * @version 1.1.0
 * @description
 * Contrato para el caso de uso de inicio de sesion.
 */
export abstract class IPostSignInUseCase {
  /**
   * @method execute
   * @description Ejecuta el inicio de sesion.
   * @param {{ email: string; password: string }} params Credenciales.
   * @returns {Observable<SignInModel>}
   */
  abstract execute(params: { email: string; password: string }): Observable<SignInModel>;
}
