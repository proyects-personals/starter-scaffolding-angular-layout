import type { Observable } from 'rxjs';
import type { ConfirmSignUpInput } from 'aws-amplify/auth';
import type { ConfirmSignUpModel } from '@/app/domain';

/**
 * @class IConfirmSignUpRepository
 * @version 1.0.0
 * @description
 * Interfaz que define el contrato para la confirmacion de registro.
 * Garantiza un modelo de dominio consistente.
 */
export abstract class IConfirmSignUpRepository {
  /**
   * @method confirm
   * @description Confirma el registro de un usuario con su codigo.
   * @param {ConfirmSignUpInput} params Username y codigo de confirmacion.
   * @returns {Observable<ConfirmSignUpModel>} Flujo con el resultado.
   */
  abstract confirm(params: ConfirmSignUpInput): Observable<ConfirmSignUpModel>;
}
