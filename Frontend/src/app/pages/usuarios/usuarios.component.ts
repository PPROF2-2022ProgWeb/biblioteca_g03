import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IDataTableColumn, IDataTableSelectionChanged } from 'src/app/interfaces/dataTable';
import { Libro } from 'src/app/models/Libro';
import { Usuario } from 'src/app/models/Usuario';
import { LibrosService } from 'src/app/services/libros.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('contenedorTabla') contenedorTabla: ElementRef;

  public Usuarios: Usuario[] = [];
  public UsuarioSeleccionado: Usuario | null;
  public isModalOpen = false;
  public isEditing: boolean = false;

  public get tituloModal(): string {
    return this.isEditing ? 'Editar usuario' : 'Agregar usuario';
  }

  public tableColumns: IDataTableColumn[] = [
    {
      name: 'Nombre',
      source: 'nombre',
    },
    {
      name: 'Apellido',
      source: 'apellido',
    },
    {
      name: 'Domicilio',
      source: 'domicilio',
    },
    {
      name: 'Telefono',
      source: 'telefono',
    },
  ];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.cargarUsuarios().subscribe(data => {
      this.Usuarios = data;
      this.UsuarioSeleccionado = null;
    })
  }

  cargarDetalleUsuario(e: IDataTableSelectionChanged): void {
    let id = e.current.item['idUsuario'];
    this.usuariosService.cargarUsuarioById(id).subscribe(data => {
      this.UsuarioSeleccionado = data;
    })
  }

  eliminarUsuario(): void {
    if(this.UsuarioSeleccionado && this.UsuarioSeleccionado.idUsuario){
      let id = this.UsuarioSeleccionado.idUsuario as number;
      this.usuariosService.eliminarUsuario(id).subscribe(data => {
        this.cargarUsuarios();
      })
    }
  }

  agregarUsuario(usuario: Usuario): void {
    this.usuariosService.agregarUsuario(usuario).subscribe(data => {
      this.isModalOpen = false;
      this.cargarUsuarios();
    })
  }

  editarUsuario(usuario: Usuario): void{
    this.usuariosService.editarUsuario(usuario).subscribe(() => {
      this.isModalOpen = false;
      this.isEditing = false;
      this.cargarUsuarios();
    })
  }



  onSubmit(usuario: Usuario) {
    if (this.isEditing) {
      this.editarUsuario(usuario);
    } else {
      this.agregarUsuario(usuario);
    }
    console.log(usuario);
  }

  onCancel(){
    this.isModalOpen = false;
    this.isEditing = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  startEdit() {
    this.isEditing = true;
    this.openModal();
  }
}
