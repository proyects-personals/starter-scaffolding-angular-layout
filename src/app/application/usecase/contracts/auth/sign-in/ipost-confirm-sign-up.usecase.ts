import type { Observable } from 'rxjs';
import type { ConfirmSignUpModel } from '@/app/domain';
import type { ConfirmSignUpInput } from 'aws-amplify/auth';

/**
 * @class IPostConfirmSignUpUseCase
 * @version 1.1.0
 * @description
 * Contrato del caso de uso para la confirmacion de registro.
 */
export abstract class IPostConfirmSignUpUseCase {
  /**
   * @method execute
   * @description Ejecuta la confirmacion del usuario.
   * @param {ConfirmSignUpInput} params Datos de confirmacion.
   * @returns {Observable<ConfirmSignUpModel>}
   */
  abstract execute(params: ConfirmSignUpInput): Observable<ConfirmSignUpModel>;
}
