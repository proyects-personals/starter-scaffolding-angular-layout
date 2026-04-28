import type { Observable } from 'rxjs';
import type { ConfirmSignUpModel } from '@/app/domain';
import type { ConfirmSignUpInput } from 'aws-amplify/auth';

/**
 * @class IConfirmSignUpInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para confirmacion de registro.
 */
export abstract class IConfirmSignUpInteractor {
  /**
   * @method confirm
   * @description Ejecuta la confirmacion de registro.
   * @param {ConfirmSignUpInput} params Datos de confirmacion.
   * @returns {Observable<ConfirmSignUpModel>}
   */
  abstract confirm(params: ConfirmSignUpInput): Observable<ConfirmSignUpModel>;
}
