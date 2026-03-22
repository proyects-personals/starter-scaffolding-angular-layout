import type { Observable } from 'rxjs';
import type { SignUpModel, SignUpParametersEntity } from '@/app/domain';

/**
 * @class IRegisterInteractor
 * @version 1.0.0
 * @description
 * Contrato del interactor para registro.
 */
export abstract class ISignUpInteractor {
  /**
   * @method register
   * @description Ejecuta el registro.
   * @param {SignUpParametersEntity} params Datos de registro.
   * @returns {Observable<RegisterModel>}
   */
  abstract register(params: SignUpParametersEntity): Observable<SignUpModel>;
}
