import { SignUpStepEnum } from '@/app';
import type { SignInOutput } from 'aws-amplify/auth';

/**
 * @interface SignInPlainObject
 * @description Estructura de datos plana para el modelo de inicio de sesión.
 */
export interface SignInPlainObject {
  success: boolean;
  nextStep: string;
  rawOutput: SignInOutput;
}

/**
 * @class SignInModel
 * @version 1.1.0
 * @author Steveen Ordoñez
 * @description
 * Modelo de dominio que representa el resultado de un intento de inicio de sesión.
 */
export class SignInModel {
  constructor(
    private readonly success: boolean,
    private readonly nextStep: string,
    private readonly rawOutput: SignInOutput,
  ) {}

  /** @returns {boolean} Indica si el inicio de sesión fue exitoso. */
  public isSuccess(): boolean {
    return this.success;
  }

  /** @returns {string} El siguiente paso requerido por el flujo de autenticación. */
  public getNextStep(): string {
    return this.nextStep;
  }

  /** @returns {SignInOutput} La respuesta completa original de AWS Amplify. */
  public getRawOutput(): SignInOutput {
    return this.rawOutput;
  }

  /** @description Verifica si se requiere cambio de contraseña obligatorio. */
  public requiereCambioPassword(): boolean {
    const step: string = SignUpStepEnum.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED;
    return this.nextStep === step;
  }

  /** @description Verifica si el flujo requiere validación por MFA (SMS o TOTP). */
  public requiereMFA(): boolean {
    const smsStep: string = SignUpStepEnum.CONFIRM_SIGN_IN_WITH_SMS_CODE;
    const totpStep: string = SignUpStepEnum.CONFIRM_SIGN_IN_WITH_TOTP_CODE;

    return this.nextStep === smsStep || this.nextStep === totpStep;
  }

  /** @description Indica si el siguiente paso es confirmar el registro. */
  public getNextConfirmSignUpStep(): boolean {
    const step: string = SignUpStepEnum.CONFIRM_SIGN_UP;
    return this.nextStep === step;
  }

  /** @description Indica si el proceso de autenticación ha finalizado con éxito. */
  public getNextDone(): boolean {
    const step: string = SignUpStepEnum.DONE;
    return this.nextStep === step;
  }

  /**
   * @method toPlainObject
   * @description Convierte el modelo a un objeto literal de JavaScript.
   * @returns {SignInPlainObject} Objeto plano con la información de la sesión.
   */
  public toPlainObject(): SignInPlainObject {
    return {
      success: this.success,
      nextStep: this.nextStep,
      rawOutput: this.rawOutput,
    };
  }
}
