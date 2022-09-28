import { Prestamo } from "./Prestamo";

export class Devolucion {
  public nombreUsuario: string;
  public tituloLibro: string;
  public prestamo: Prestamo | null;

  constructor(
    public idDevolucion: number | null,
    public idUsuario: number,
    public idLibro: number,
    public idPrestamo: number,
    public fechaRegreso: string,
    public descripcion: string
  ) {}
}
