import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl: string = environment.apiUrl;
  private usuariosUrl: string = environment.usuariosUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}${this.usuariosUrl}/agregar`, JSON.stringify(usuario), this.httpOptions)
  }

  cargarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}${this.usuariosUrl}`);
  }

  cargarUsuarioById(id: number | string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}${this.usuariosUrl}/${id}`);
  }

  eliminarUsuario(id: number | string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}${this.usuariosUrl}/eliminar/${id}`, this.httpOptions);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}${this.usuariosUrl}/modificar/${usuario.idUsuario}`, JSON.stringify(usuario), this.httpOptions)
  }
}
