import type { SignUpStepEnum } from '@/app/domain/enums';

/**
 * Interfaz que define la estructura del resultado de inicio de sesión.
 * Sustituye el uso de 'any' asegurando el tipado de los métodos de flujo.
 */
export interface ISignInResult {
  isSuccess(): boolean;
  getNextStep(): SignUpStepEnum;
}
