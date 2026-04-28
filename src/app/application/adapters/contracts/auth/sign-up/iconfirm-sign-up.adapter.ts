import type { ConfirmSignUpInput, ConfirmSignUpOutput } from 'aws-amplify/auth';
import type { Observable } from 'rxjs';

/**
 * @class IConfirmSignUpAdapter
 * @version 1.0.0
 * @description
 * Interfaz para el adaptador de confirmacion de registro.
 * Define el contrato para confirmar el registro de un usuario en AWS Amplify.
 */
export abstract class IConfirmSignUpAdapter {
  /**
   * @method confirmSignUp
   * @description Confirma el registro de un usuario en AWS Amplify.
   * @param {ConfirmSignUpInput} params Objeto con username y codigo de confirmacion.
   * @returns {Promise<ConfirmSignUpOutput | undefined>} Respuesta de AWS Amplify.
   */
  abstract confirmSignUp(params: ConfirmSignUpInput): Observable<ConfirmSignUpOutput>;
}
