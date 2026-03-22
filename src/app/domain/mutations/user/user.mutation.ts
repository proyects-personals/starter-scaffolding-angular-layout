import type { CreateUserEntity } from '@/app';
import type { SignUpOutput } from 'aws-amplify/auth';

/**
 * @interface CreateUserMutationResponse
 * @description Tipado de la respuesta esperada de la mutación createUsuarios.
 */
export interface CreateUserMutationResponse {
  createUsuarios: {
    id: string;
  };
}

/**
 * @interface CreateUserInput
 * @description Estructura del input requerida por la mutación en AppSync/GraphQL.
 */
export interface CreateUserInput {
  input: {
    id: string;
    nombre: string;
    apellidos: string;
    cedula: string;
    celular: string;
    correo: string;
    role: string;
  };
}

/**
 * @constant CreateUserMutation
 * @description Query GraphQL para la creación de un nuevo usuario en la base de datos.
 */
export const CreateUserMutation = `
      mutation CreateUsuario($input: CreateUsuariosInput!) {
        createUsuarios(input: $input) {
          id
        }
      }
    `;

/**
 * @function createUserVariables
 * @description Mapea la entidad de dominio y la info de Auth al formato de entrada de la mutación.
 * @param {CreateUserEntity} entity - Datos del usuario desde el dominio.
 * @param {SignUpOutput} info - Información resultante del SignUp de Amplify.
 * @returns {CreateUserInput} Objeto formateado para la variable de la mutación.
 */
export const createUserVariables = (
  entity: CreateUserEntity,
  info: SignUpOutput,
): CreateUserInput => ({
  input: {
    id: info.userId ?? '',
    nombre: entity.nombre,
    apellidos: entity.apellidos,
    cedula: entity.cedula ?? '',
    celular: entity.celular,
    correo: entity.correo,
    role: entity.role,
  },
});
