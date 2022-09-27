import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Devolucion } from '../models/Devolucion';
import { Libro } from '../models/Libro';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {
  private apiUrl: string = environment.apiUrl;
  private devolucionsUrl: string = environment.devolucionesUrl;
  private librosUrl: string = environment.librosUrl;
  private usuariosUrl: string = environment.usuariosUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  agregarDevolucion(devolucion: Devolucion): Observable<Devolucion> {
    return this.http.post<Devolucion>(
      `${this.apiUrl}${this.devolucionsUrl}/agregar`,
      JSON.stringify(devolucion),
      this.httpOptions
    );
  }

  cargarDatos() {
    return forkJoin([
      this.http.get<Devolucion[]>(`${this.apiUrl}${this.devolucionsUrl}`),
      this.http.get<Libro[]>(`${this.apiUrl}${this.librosUrl}`),
      this.http.get<Usuario[]>(`${this.apiUrl}${this.usuariosUrl}`),
    ]).pipe(
      map((data: any[]) => {
        let devoluciones = data[0] as Devolucion[];
        let libros = data[1] as Libro[];
        let usuarios = data[2] as Usuario[];
        devoluciones.forEach((p: Devolucion) => {
          let usuario = usuarios.find((u: Usuario) => u.idUsuario === p.idUsuario)
          p.nombreUsuario = `${usuario?.apellido}, ${usuario?.nombre}`
          p.tituloLibro =
            libros.find((u: Libro) => u.idLibro === p.idUsuario)?.titulo || '';
        });
        return { devoluciones, libros, usuarios };
      })
    );
  }

  cargarDevolucionById(id: number | string) {
    return this.http
      .get<Devolucion>(`${this.apiUrl}${this.devolucionsUrl}/${id}`)
      .pipe(
        switchMap((devolucion) => {
            return forkJoin([
              this.http.get<Libro>(
                `${this.apiUrl}${this.librosUrl}/${devolucion.idLibro}`
              ),
              this.http.get<Usuario>(
                `${this.apiUrl}${this.usuariosUrl}/${devolucion.idUsuario}`
              ),
            ]).pipe(
              map((data: any[]) => {
                let libro = data[0] as Libro;
                let usuario = data[1] as Usuario;

                devolucion.nombreUsuario = `${usuario.apellido}, ${usuario.nombre}`
                devolucion.tituloLibro = libro.titulo
                return devolucion
              })
            );
        })
      );
  }

  eliminarDevolucion(id: number | string): Observable<Devolucion> {
    return this.http.delete<Devolucion>(
      `${this.apiUrl}${this.devolucionsUrl}/eliminar/${id}`,
      this.httpOptions
    );
  }

  editarDevolucion(devolucion: Devolucion): Observable<Devolucion> {
    return this.http.put<Devolucion>(
      `${this.apiUrl}${this.devolucionsUrl}/modificar/${devolucion.idDevolucion}`,
      JSON.stringify(devolucion),
      this.httpOptions
    );
  }
}
