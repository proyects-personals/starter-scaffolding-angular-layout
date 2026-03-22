import { CodeEnum, SignUpStepEnum } from '@/app';
import type { CodeDeliveryDetails } from 'aws-amplify/auth';

/**
 * @interface SignUpPlainObject
 * @description Estructura plana para el transporte de datos del modelo de registro.
 */
export interface SignUpPlainObject {
  userId: string;
  success: boolean;
  nextStep: string;
  codeDeliveryDetails: CodeDeliveryDetails | null;
}

/**
 * @class SignUpModel
 * @version 1.1.1
 * @author Steveen Ordoñez
 * @description
 * Modelo de dominio que representa el resultado del registro de usuario.
 */
export class SignUpModel {
  constructor(
    private readonly userId: string,
    private readonly success: boolean,
    private readonly nextStep: string,
    private readonly codeDeliveryDetails: CodeDeliveryDetails | null = null,
  ) {}

  /** @returns {string} Identificador único del usuario. */
  public getUserId(): string {
    return this.userId;
  }

  /** @returns {boolean} Indica si la operación de registro fue exitosa. */
  public isSuccess(): boolean {
    return this.success;
  }

  /** @returns {string} El siguiente paso requerido en el flujo. */
  public getNextStep(): string {
    return this.nextStep;
  }

  /** @returns {CodeDeliveryDetails | null} Detalles sobre el envío del código de verificación. */
  public getCodeDeliveryDetails(): CodeDeliveryDetails | null {
    return this.codeDeliveryDetails;
  }

  /**
   * @method requiresEmailConfirmation
   * @description Verifica si el flujo requiere confirmación mediante correo electrónico.
   */
  public requiresEmailConfirmation(): boolean {
    const confirmStep: string = SignUpStepEnum.CONFIRM_SIGN_UP;
    const emailMedium: string = CodeEnum.CODE_EMAIL;

    return (
      this.nextStep === confirmStep &&
      !!this.codeDeliveryDetails &&
      this.codeDeliveryDetails.deliveryMedium?.toUpperCase() === emailMedium
    );
  }

  /**
   * @method requiresSMSConfirmation
   * @description Verifica si el flujo requiere confirmación mediante mensaje de texto (SMS).
   */
  public requiresSMSConfirmation(): boolean {
    const confirmStep: string = SignUpStepEnum.CONFIRM_SIGN_UP;
    const smsMedium: string = CodeEnum.CODE_SMS;

    return (
      this.nextStep === confirmStep &&
      !!this.codeDeliveryDetails &&
      this.codeDeliveryDetails.deliveryMedium?.toUpperCase() === smsMedium
    );
  }

  /** @returns {string} Destino donde se envió el código (email o teléfono). */
  public getDestination(): string {
    return this.codeDeliveryDetails?.destination ?? '';
  }

  /**
   * @method toPlainObject
   * @description Convierte la instancia del modelo a un objeto literal.
   * @returns {SignUpPlainObject}
   */
  public toPlainObject(): SignUpPlainObject {
    return {
      userId: this.userId,
      success: this.success,
      nextStep: this.nextStep,
      codeDeliveryDetails: this.codeDeliveryDetails,
    };
  }
}
