export class Usuario {
  constructor(
    public idUsuario: number | null,
    public nombre: string,
    public apellido: string,
    public domicilio: string,
    public telefono: string,
    public sanciones: number,
    public sancionesMonetarias: number
  ) {}
}
