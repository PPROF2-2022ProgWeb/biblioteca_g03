export class Devolucion {
  public nombreUsuario: string;
  public tituloLibro: string;

  constructor(
    public idDevolucion: number,
    public idUsuario: number,
    public idLibro: number,
    public idPrestamo: number,
    public fechaRegreso: string,
    public descripcion: string
  ) {}
}
