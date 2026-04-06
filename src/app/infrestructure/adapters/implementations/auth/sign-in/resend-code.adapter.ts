import type { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { resendSignUpCode } from 'aws-amplify/auth';

import type { IResendCodeAdapter } from '@/app/application';
import type { ResendCodeEntity } from '@/app/domain';
import { errorMessageStringUtil } from '@/app/domain';

/**
 * @class ResendCodeAdapter
 * @version 1.1.0
 * @description
 * Adaptador de infraestructura que implementa el reenvio de codigo mediante AWS Amplify.
 * Transforma promesas en flujos reactivos usando Observables.
 */
export class ResendCodeAdapter implements IResendCodeAdapter {
  /**
   * @method resendCode
   * @description Reenvia el codigo de confirmacion desde AWS Cognito.
   * @param {string} username Identificador del usuario.
   * @returns {Observable<ResendCodeEntity>} Flujo con la informacion del envio.
   * @throws {Error} Error mapeado si la operacion falla.
   */
public resendCode(username: string): Observable<ResendCodeEntity> {
  console.log('📨 [ResendCode] Solicitando nuevo código para:', username);

  return from(resendSignUpCode({ username })).pipe(
    // 1. Log de la respuesta cruda de Amplify (trae destination, deliveryMedium, etc.)
    tap((rawResponse) => {
      console.log('📦 [Amplify Resend Raw Output]:', rawResponse);
    }),

    map(({ destination, deliveryMedium, attributeName }) => {
      const mappedResponse: ResendCodeEntity = {
        destination: destination ?? null,
        deliveryMedium: deliveryMedium ?? null,
        attributeName: attributeName ?? null,
      };
      
      // 2. Log de lo que tu app recibe finalmente
      console.log('✅ [ResendCode Mapped]: Código enviado a:', mappedResponse.destination);
      return mappedResponse;
    }),

    catchError((error) => {
      const errorMessage = errorMessageStringUtil(error);
      
      // 3. Log de error detallado
      console.error('❌ [ResendCode Error]:', {
        originalError: error,
        code: error?.name,      // Amplify suele enviar el tipo de error aquí (LimitExceededException, etc.)
        message: errorMessage
      });
      
      return throwError(() => new Error(errorMessage));
    }),
  );
}
}
