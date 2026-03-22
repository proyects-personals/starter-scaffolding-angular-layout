import type { Observable } from 'rxjs';
import type { ResendCodeEntity } from '@/app/domain';

/**
 * @class IResendCodeAdapter
 * @version 1.0.0
 * @description
 * Interfaz para el adaptador encargado de reenviar el codigo de confirmacion.
 * Define el contrato para proveedores de autenticacion.
 */
export abstract class IResendCodeAdapter {
  /**
   * @method resendCode
   * @description Reenvia el codigo de confirmacion al usuario.
   * @param {string} username Correo o identificador del usuario.
   * @returns {Observable<ResendCodeEntity>} Flujo con la informacion del envio del codigo.
   */
  abstract resendCode(username: string): Observable<ResendCodeEntity>;
}
