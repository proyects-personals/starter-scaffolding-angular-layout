import type { Observable } from 'rxjs';
import type { SignUpModel, SignUpParametersEntity } from '@/app/domain';

/**
 * @class IPostRegisterUseCase
 * @version 1.0.0
 * @description
 * Contrato del caso de uso de registro.
 */
export abstract class IPostSignUpUseCase {
  /**
   * @method execute
   * @description Ejecuta el registro.
   * @param {SignUpParametersEntity} params Datos de registro.
   * @returns {Observable<RegisterModel>}
   */
  abstract execute(params: SignUpParametersEntity): Observable<SignUpModel>;
}
