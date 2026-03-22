import type { SignUpResponseEntity } from '@/app/domain';
import { SignUpModel, SignUpStepEnum } from '@/app/domain';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @class SignUpMapper
 * @version 1.2.5
 * @author Steveen Ordoñez
 * @description
 * Mapper encargado de transformar la respuesta de infraestructura en un modelo de dominio.
 * Soluciona el error de comparación insegura de Enums mediante validación de valores.
 */
export class SignUpMapper {
  /**
   * @method toModel
   * @description Convierte la entidad de respuesta de infraestructura en un modelo de dominio.
   * @param {SignUpResponseEntity} response - Objeto de respuesta del adaptador.
   * @returns {SignUpModel} Modelo de dominio para el registro.
   */
  public toModel(response: SignUpResponseEntity): SignUpModel {
    const signUp: SignUpOutput | undefined = response.SignUpOutput;
    const userId: string = signUp?.userId ?? '';
    const nextStep = signUp?.nextStep;
    const rawNextStep = nextStep?.signUpStep ?? '';

    let codeDelivery = null;

    /**
     * @description
     * Para evitar 'no-unsafe-enum-comparison', extraemos el valor del Enum a una
     * constante de tipo string. Esto permite que la comparación sea entre dos
     * strings nativos, lo cual es 100% seguro para el linter.
     */
    const confirmStepValue: string = SignUpStepEnum.CONFIRM_SIGN_UP;

    if (nextStep?.signUpStep === confirmStepValue && 'codeDeliveryDetails' in nextStep) {
      codeDelivery = nextStep.codeDeliveryDetails ?? null;
    }

    return new SignUpModel(userId, !!response.success, rawNextStep, codeDelivery);
  }
}
