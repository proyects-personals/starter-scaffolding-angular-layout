import type { ResetPasswordOutput, CodeDeliveryDetails } from 'aws-amplify/auth';

/**
 * @interface ResetPasswordPlainObject
 * @description Estructura de datos plana para el modelo de recuperación de contraseña.
 */
export interface ResetPasswordPlainObject {
  step: ResetPasswordOutput['nextStep']['resetPasswordStep'];
  codeDeliveryDetails: CodeDeliveryDetails | null;
  isPasswordReset: boolean;
  rawOutput: ResetPasswordOutput | null;
}

/**
 * @class ResetPasswordModel
 * @version 1.1.1
 * @author Steveen Ordoñez
 * @description
 * Modelo de dominio que abstrae la respuesta de AWS Amplify para el flujo de reset password.
 */
export class ResetPasswordModel {
  private readonly rawOutput: ResetPasswordOutput | null;

  /**
   * @constructor
   * @param step - Paso siguiente del flujo de recuperación.
   * @param codeDeliveryDetails - Detalles de envío del código (email/SMS).
   * @param isPasswordReset - Indica si la contraseña fue restablecida exitosamente.
   * @param rawOutput - Respuesta original de infraestructura (opcional).
   */
  constructor(
    private readonly step: ResetPasswordOutput['nextStep']['resetPasswordStep'],
    private readonly codeDeliveryDetails: CodeDeliveryDetails | null,
    private readonly isPasswordReset: boolean,
    rawOutput: ResetPasswordOutput | null = null,
  ) {
    this.rawOutput = rawOutput;
  }

  /**
   * @method requiresCode
   * @description Indica si el flujo requiere código de verificación para continuar.
   * @returns {boolean} True si el paso es confirmación con código.
   */
  public requiresCode(): boolean {
    return this.step === 'CONFIRM_RESET_PASSWORD_WITH_CODE';
  }

  /**
   * @method getStep
   * @returns {ResetPasswordOutput['nextStep']['resetPasswordStep']} Paso actual del flujo.
   */
  public getStep(): ResetPasswordOutput['nextStep']['resetPasswordStep'] {
    return this.step;
  }

  /**
   * @method getCodeDeliveryDetails
   * @returns {CodeDeliveryDetails | null} Detalles de envío del código.
   */
  public getCodeDeliveryDetails(): CodeDeliveryDetails | null {
    return this.codeDeliveryDetails;
  }

  /**
   * @method isCompleted
   * @returns {boolean} Indica si el proceso ha finalizado correctamente.
   */
  public isCompleted(): boolean {
    return this.isPasswordReset;
  }

  /**
   * @method toPlainObject
   * @description Convierte la instancia del modelo a un objeto literal para su transporte o uso en UI.
   * @returns {ResetPasswordPlainObject} Objeto con la información del estado del reset.
   */
  public toPlainObject(): ResetPasswordPlainObject {
    return {
      step: this.step,
      codeDeliveryDetails: this.codeDeliveryDetails,
      isPasswordReset: this.isPasswordReset,
      rawOutput: this.rawOutput,
    };
  }
}
