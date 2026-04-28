import type { Observable } from 'rxjs';
import type { ConfirmSignInModel, ConfirmSignInInputEntity } from '@/app/domain';

/**
 * Contrato del interactor para confirmación de sign-in.
 */
export abstract class IConfirmSignInInteractor {
  /**
   * Ejecuta la confirmación del inicio de sesión.
   * @param params Datos de entrada
   * @returns Observable con el modelo de dominio
   */
  abstract confirm(params: ConfirmSignInInputEntity): Observable<ConfirmSignInModel>;
}
