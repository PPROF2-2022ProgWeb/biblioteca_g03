export class Libro {
  constructor(
    public idLibro: number | null | undefined,
    public titulo: string,
    public autor: string,
    public categoria: string,
    public editor: string,
    public lenguajes: string,
    public paginas: string,
    public descripcion: string,
    public stock: number,
    public disponibles: number
  ) {}
}
