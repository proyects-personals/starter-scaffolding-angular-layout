/**
 * Datos requeridos para crear un usuario en la base de datos
 * posterior al registro en Cognito.
 */
export class CreateUserEntity {
  readonly nombre: string;
  readonly apellidos: string;
  readonly cedula: string;
  readonly celular: string;
  readonly correo: string;
  readonly role: string;

  constructor(props: {
    nombre: string;
    apellidos: string;
    cedula: string;
    celular: string;
    correo: string;
    role: string;
  }) {
    this.nombre = props.nombre;
    this.apellidos = props.apellidos;
    this.cedula = props.cedula;
    this.celular = props.celular;
    this.correo = props.correo;
    this.role = props.role;
  }
}

export interface UsuarioResponseEntity {
  id: string;
  nombre: string;
  apellidos: string;
  cedula: string;
  celular: string;
  correo: string;
  role: string;
}
