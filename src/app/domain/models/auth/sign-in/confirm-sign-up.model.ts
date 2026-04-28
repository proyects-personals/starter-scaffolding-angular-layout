/**
 * @interface ConfirmSignUpPlainObject
 * @description Estructura de datos plana para el modelo de confirmación.
 */
export interface ConfirmSignUpPlainObject {
  isConfirmed: boolean;
  nextStep: string | null;
  isSignUpComplete: boolean | undefined;
  userId: string | null;
}

/**
 * @class ConfirmSignUpModel
 * @version 1.0.1
 * @author Steveen Ordoñez
 * @description
 * Modelo de dominio que representa el resultado de la confirmación de registro.
 */
export class ConfirmSignUpModel {
  constructor(
    private readonly isConfirmed: boolean,
    private readonly nextStep: string | null,
    private readonly isSignUpComplete: boolean | undefined,
    private readonly userId: string | null,
  ) {}

  /** @returns {boolean} Indica si la confirmación fue exitosa. */
  public estaConfirmado(): boolean {
    return this.isConfirmed;
  }

  /** @returns {string | null} Siguiente paso en el flujo de AWS. */
  public getNextStep(): string | null {
    return this.nextStep;
  }

  /** @returns {boolean | undefined} Estado de completitud del registro. */
  public getIsSignUpComplete(): boolean | undefined {
    return this.isSignUpComplete;
  }

  /** @returns {string | null} Identificador único del usuario. */
  public getUserId(): string | null {
    return this.userId;
  }

  /**
   * @method toPlainObject
   * @description Convierte la instancia de la clase a un objeto literal de JS.
   * @returns {ConfirmSignUpPlainObject} Objeto plano con el estado de la confirmación.
   */
  public toPlainObject(): ConfirmSignUpPlainObject {
    return {
      isConfirmed: this.isConfirmed,
      nextStep: this.nextStep,
      isSignUpComplete: this.isSignUpComplete,
      userId: this.userId,
    };
  }
}
