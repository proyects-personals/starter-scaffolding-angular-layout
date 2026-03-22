import type { Observable } from 'rxjs';
import type { SignUpModel, SignUpParametersEntity } from '@/app/domain';

/**
 * @class ISignUpRepository
 * @version 1.0.0
 * @description
 * Contrato para el repositorio de registro de usuarios.
 */
export abstract class ISignUpRepository {
  /**
   * @method sign up
   * @description Ejecuta el registro y retorna el modelo de dominio.
   * @param {SignUpParametersEntity} params Datos del usuario.
   * @returns {Observable<SignUpModel>} Flujo reactivo con el resultado.
   */
  abstract register(params: SignUpParametersEntity): Observable<SignUpModel>;
}
