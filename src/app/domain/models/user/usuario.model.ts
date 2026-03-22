export class UsuarioResponseModel {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly apellidos: string,
    public readonly cedula: string,
    public readonly celular: string,
    public readonly correo: string,
    public readonly role: string,
  ) {}
}
