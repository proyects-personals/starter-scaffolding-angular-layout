import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';

/**
 * @constant MIN_PASSWORD_LENGTH
 * @description Regla de negocio que define la longitud mínima permitida para la contraseña.
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * @validator requiredValidator
 * @description Validador funcional que envuelve Validators.required para evitar referencias directas a métodos.
 */
export const requiredValidator: ValidatorFn = (control: AbstractControl) =>
  Validators.required(control);

/**
 * @validator minPasswordLengthValidator
 * @description Genera un validador de longitud mínima reutilizable.
 * @param min número mínimo de caracteres
 */
export const minPasswordLengthValidator =
  (min: number): ValidatorFn =>
  (control: AbstractControl) =>
    Validators.minLength(min)(control);

/**
 * @constant PASSWORD_VALIDATORS
 * @description Conjunto de validadores aplicados al campo password.
 */
export const PASSWORD_VALIDATORS: ValidatorFn[] = [
  requiredValidator,
  minPasswordLengthValidator(MIN_PASSWORD_LENGTH),
];

/**
 * @function required
 * @description Wrapper seguro para Validator.required
 */
export const required = (c: AbstractControl): null | object => Validators.required(c);

/**
 * @function email
 * @description Wrapper seguro para Validator.email
 */
export const email = (c: AbstractControl): null | object => Validators.email(c);

/**
 * @function minLength
 * @description Wrapper tipado para validación de longitud mínima
 */
export const minLength =
  (min: number): ValidatorFn =>
  (c: AbstractControl): null | object =>
    Validators.minLength(min)(c);
