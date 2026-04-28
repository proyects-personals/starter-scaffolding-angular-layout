import { SignUpStepEnum } from '@/app';
import type { SignInOutput } from 'aws-amplify/auth';

/**
 * @type SignInStepType
 * @description
 * Tipo de paso de autenticación retornado por AWS Amplify.
 */
type SignInStepType = SignInOutput['nextStep']['signInStep'];

/**
 * @interface SignInPlainObject
 * @description
 * Representación serializable del modelo de autenticación.
 */
export interface SignInPlainObject {
  success: boolean;
  nextStep: SignInStepType | null;
  rawOutput: SignInOutput;
}

/**
 * @class SignInModel
 * @description
 * Modelo de dominio que encapsula el resultado del flujo de inicio de sesión.
 * Permite interpretar el siguiente paso del proceso de autenticación
 * sin acoplar la lógica directamente a AWS Amplify.
 *
 * @version 2.0.0
 */
export class SignInModel {
  /**
   * @constructor
   * @param success indica si el login fue exitoso
   * @param nextStep siguiente paso del flujo de autenticación
   * @param rawOutput respuesta original de AWS Amplify
   */
  constructor(
    private readonly success: boolean,
    private readonly nextStep: SignInStepType | null,
    private readonly rawOutput: SignInOutput,
  ) {}

  /**
   * @method isSuccess
   * @description Indica si el inicio de sesión fue exitoso.
   */
  public isSuccess(): boolean {
    return this.success;
  }

  /**
   * @method getNextStep
   * @description Retorna el siguiente paso del flujo de autenticación.
   */
  public getNextStep(): SignInStepType | null {
    return this.nextStep;
  }

  /**
   * @method getRawOutput
   * @description Retorna la respuesta original de AWS Amplify.
   */
  public getRawOutput(): SignInOutput {
    return this.rawOutput;
  }

  /**
   * @method requiereCambioPassword
   * @description Indica si el usuario debe cambiar su contraseña.
   */
  public requiereCambioPassword(): boolean {
    return this.isStep(SignUpStepEnum.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED);
  }

  /**
   * @method requiereMFA
   * @description Indica si el flujo requiere autenticación multifactor (MFA).
   */
  public requiereMFA(): boolean {
    return (
      this.isStep(SignUpStepEnum.CONFIRM_SIGN_IN_WITH_SMS_CODE) ||
      this.isStep(SignUpStepEnum.CONFIRM_SIGN_IN_WITH_TOTP_CODE) ||
      this.isStep(SignUpStepEnum.CONFIRM_SIGN_IN_WITH_EMAIL_CODE)
    );
  }

  /**
   * @method requiereConfirmSignUp
   * @description Indica si el usuario debe confirmar su registro.
   */
  public requiereConfirmSignUp(): boolean {
    return this.isStep(SignUpStepEnum.CONFIRM_SIGN_UP);
  }

  /**
   * @method isDone
   * @description Indica si el flujo de autenticación ha finalizado correctamente.
   */
  public isDone(): boolean {
    return this.isStep(SignUpStepEnum.DONE);
  }

  /**
   * @method isStep
   * @description
   * Compara de forma segura el siguiente paso actual con un paso esperado.
   *
   * @param step paso a comparar
   */
  private isStep(step: SignInStepType | SignUpStepEnum): boolean {
    if (!this.nextStep) return false;

    return this.nextStep === step;
  }

  /**
   * @method toPlainObject
   * @description Convierte el modelo a objeto plano para logs o persistencia.
   */
  public toPlainObject(): SignInPlainObject {
    return {
      success: this.success,
      nextStep: this.nextStep,
      rawOutput: this.rawOutput,
    };
  }
}
