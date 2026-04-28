import type { FormControl } from '@angular/forms';

/**
 * @interface ILoginForm
 * @description
 * Define el tipado estricto de los controles del formulario de inicio de sesión.
 * Permite un manejo seguro de los valores sin posibilidad de null o undefined.
 */
export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

/**
 * @interface PasswordForm
 * @description
 * Define la estructura tipada del formulario de cambio de contraseña
 * requerido en el flujo de autenticación (New Password Required).
 */
export interface PasswordForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
