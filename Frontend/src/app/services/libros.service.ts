import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Libro } from '../models/Libro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiUrl = environment.apiUrl;
  private librosUrl = environment.librosUrl;

  public libros: Libro[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  cargarLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl + this.librosUrl);
  }

  buscarLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(this.apiUrl + this.librosUrl + `/${id}`);
  }

  agregarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(
      this.apiUrl + this.librosUrl + '/agregar',
      JSON.stringify(libro),
      this.httpOptions
    );
  }

  editarLibro(libro: Libro) {
    console.log(libro);
    return this.http.put<Libro>(
      this.apiUrl + this.librosUrl + `/modificar/${libro.idLibro}`,
      JSON.stringify(libro),
      this.httpOptions
    );
  }

  eliminarLibro(id: number | string) {
    return this.http.delete(
      this.apiUrl + this.librosUrl + `/eliminar/${id}`,
      this.httpOptions
    );
  }
}
