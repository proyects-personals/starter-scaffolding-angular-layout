import type { Observable } from 'rxjs';
import type { ConfirmSignInModel, ConfirmSignInInputEntity } from '@/app/domain';

/**
 * Contrato del repositorio para confirmación de inicio de sesión.
 */
export abstract class IConfirmSignInRepository {
  /**
   * Ejecuta la confirmación del sign-in con nueva contraseña.
   * @param params Datos de entrada
   * @returns Observable con el modelo de dominio
   */
  abstract confirm(params: ConfirmSignInInputEntity): Observable<ConfirmSignInModel>;
}
