import type { ConfirmSignInOutput } from 'aws-amplify/auth';
import type { ConfirmSignInModel } from '@/app/domain';

/**
 * @class ConfirmSignInMapper
 * @description Transforma la respuesta de AWS al modelo de dominio.
 */
export class ConfirmSignInMapper {
  public toModel(response: ConfirmSignInOutput): ConfirmSignInModel {
    return {
      isSignedIn: response.isSignedIn ?? false,
      nextStep: response.nextStep,
    };
  }
}
