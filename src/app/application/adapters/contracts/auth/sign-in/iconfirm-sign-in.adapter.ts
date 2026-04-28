import type { Observable } from 'rxjs';
import type { ConfirmSignInOutput } from 'aws-amplify/auth';
import type { ConfirmSignInInputEntity } from '@/app/domain';

/**
 * Contrato para confirmar el inicio de sesión con nueva contraseña
 * (flujo NEW_PASSWORD_REQUIRED en Cognito).
 */
export abstract class IConfirmSignInAdapter {
  /**
   * Ejecuta la confirmación enviando la nueva contraseña del usuario.
   * @param newPassword Nueva contraseña
   * @param attributes Atributos requeridos (ej: username)
   * @returns Observable con la respuesta de AWS Amplify
   */
  abstract confirmSignIn(params: ConfirmSignInInputEntity): Observable<ConfirmSignInOutput>;
}
