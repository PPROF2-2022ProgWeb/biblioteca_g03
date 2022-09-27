import { Libro } from './Libro';
import { Usuario } from './Usuario';
export class Prestamo {
  public nombreUsuario: string;
  public tituloLibro: string;

  constructor(
    public idPrestamo: number | null,
    public idUsuario: number,
    public idLibro: number,
    public dia_prestamo: Date,
    public dia_devolucion_estimativo: Date,
    public fecha_prestamo: string,
    public fecha_regreso: string
  ) {}
}