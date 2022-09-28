import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Libro } from '../models/Libro';
import { Prestamo } from '../models/Prestamo';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class PrestamosService {
  private apiUrl: string = environment.apiUrl;
  private prestamosUrl: string = environment.prestamosUrl;
  private librosUrl: string = environment.librosUrl;
  private usuariosUrl: string = environment.usuariosUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  agregarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(
      `${this.apiUrl}${this.prestamosUrl}/agregar`,
      JSON.stringify(prestamo),
      this.httpOptions
    );
  }

  cargarDatos() {
    return forkJoin([
      this.http.get<Prestamo[]>(`${this.apiUrl}${this.prestamosUrl}`),
      this.http.get<Libro[]>(`${this.apiUrl}${this.librosUrl}`),
      this.http.get<Usuario[]>(`${this.apiUrl}${this.usuariosUrl}`),
    ]).pipe(
      map((data: any[]) => {
        let prestamos = data[0] as Prestamo[];
        let libros = data[1] as Libro[];
        let usuarios = data[2] as Usuario[];
        prestamos.forEach((p: Prestamo) => {
          let usuario = usuarios.find(
            (u: Usuario) => u.idUsuario === p.idUsuario
          );
          p.nombreUsuario = `${usuario?.apellido}, ${usuario?.nombre}`;
          p.tituloLibro =
            libros.find((l: Libro) => l.idLibro === p.idLibro)?.titulo ||
            'Libro desconocido';
        });
        return { prestamos, libros, usuarios };
      })
    );
  }

  cargarPrestamoById(id: number | string) {
    return this.http
      .get<Prestamo>(`${this.apiUrl}${this.prestamosUrl}/${id}`)
      .pipe(
        switchMap((prestamo) => {
          return forkJoin([
            this.http.get<Libro>(
              `${this.apiUrl}${this.librosUrl}/${prestamo.idLibro}`
            ),
            this.http.get<Usuario>(
              `${this.apiUrl}${this.usuariosUrl}/${prestamo.idUsuario}`
            ),
          ]).pipe(
            map((data: any[]) => {
              let libro = data[0] as Libro;
              let usuario = data[1] as Usuario;

              prestamo.nombreUsuario = `${usuario.apellido}, ${usuario.nombre}`;
              prestamo.tituloLibro = libro.titulo;
              return prestamo;
            })
          );
        })
      );
  }

  eliminarPrestamo(id: number | string): Observable<Prestamo> {
    return this.http.delete<Prestamo>(
      `${this.apiUrl}${this.prestamosUrl}/eliminar/${id}`,
      this.httpOptions
    );
  }

  editarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(
      `${this.apiUrl}${this.prestamosUrl}/modificar/${prestamo.idPrestamo}`,
      JSON.stringify(prestamo),
      this.httpOptions
    );
  }
}
