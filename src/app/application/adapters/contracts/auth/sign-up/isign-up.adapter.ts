import type { Observable } from 'rxjs';
import type { SignUpParametersEntity, SignUpResponseEntity } from '@/app/domain';

/**
 * @class ISignUpAdapter
 * @version 1.0.0
 * @description
 * Interfaz para el adaptador de registro de usuarios.
 * Define el contrato para crear nuevos usuarios en el sistema.
 */
export abstract class ISignUpAdapter {
  /**
   * @method signUp
   * @description Registra un nuevo usuario en el sistema.
   * @param {SignUpParametersEntity} params Datos de registro del usuario.
   * @returns {Observable<SignUpResponseEntity>} Flujo con la respuesta del registro.
   */
  abstract signUp(params: SignUpParametersEntity): Observable<SignUpResponseEntity>;
}
