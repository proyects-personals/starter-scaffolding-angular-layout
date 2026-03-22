/**
 * @interface ResendCodePlainObject
 * @description Estructura de datos plana para el modelo de reenvío de código.
 */
export interface ResendCodePlainObject {
  destination: string | null;
  deliveryMedium: string | null;
  attributeName: string | null;
}

/**
 * @class ResendCodeModel
 * @version 1.1.1
 * @author Steveen Ordoñez
 * @description
 * Modelo de dominio que representa la información resultante de un reenvío de código.
 */
export class ResendCodeModel {
  constructor(
    private readonly destination: string | null,
    private readonly deliveryMedium: string | null,
    private readonly attributeName: string | null,
  ) {}

  /**
   * @method getDestination
   * @returns {string | null} Destino del envío (ej. correo parcialmente oculto).
   */
  public getDestination(): string | null {
    return this.destination;
  }

  /**
   * @method getDeliveryMedium
   * @returns {string | null} Medio de envío (SMS, EMAIL, etc.).
   */
  public getDeliveryMedium(): string | null {
    return this.deliveryMedium;
  }

  /**
   * @method getAttributeName
   * @returns {string | null} Nombre del atributo asociado (ej. email).
   */
  public getAttributeName(): string | null {
    return this.attributeName;
  }

  /**
   * @method toPlainObject
   * @description Convierte la instancia del modelo a un objeto literal de JavaScript.
   * @returns {ResendCodePlainObject} Objeto plano con la información del reenvío.
   */
  public toPlainObject(): ResendCodePlainObject {
    return {
      destination: this.destination,
      deliveryMedium: this.deliveryMedium,
      attributeName: this.attributeName,
    };
  }
}
