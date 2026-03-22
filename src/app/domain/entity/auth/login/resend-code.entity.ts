/**
 * RestablecerCodigoEntity
 *
 * Entidad de infraestructura que representa la respuesta
 * cruda recibida desde AWS Amplify.
 */
export interface ResendCodeEntity {
  destination: string | null;
  deliveryMedium: string | null;
  attributeName: string | null;
}
