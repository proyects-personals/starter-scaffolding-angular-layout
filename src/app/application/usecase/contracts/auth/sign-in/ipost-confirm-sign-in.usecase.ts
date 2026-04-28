import type { Observable } from 'rxjs';
import type { ConfirmSignInModel, ConfirmSignInInputEntity } from '@/app/domain';

/**
 * Contrato del caso de uso para confirmar el sign-in
 * con cambio de contraseña.
 */
export abstract class IPostConfirmSignInUseCase {
  /**
   * Ejecuta la confirmación del inicio de sesión.
   * @param params Datos de entrada
   * @returns Observable con el modelo de dominio
   */
  abstract execute(params: ConfirmSignInInputEntity): Observable<ConfirmSignInModel>;
}
