import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  IDataTableColumn,
  IDataTableSelectionChanged,
} from 'src/app/interfaces/dataTable';
import { Libro } from 'src/app/models/Libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { Usuario } from 'src/app/models/Usuario';
import { DateFormatterPipe } from 'src/app/pipes/date-formatter.pipe';
import { LibrosService } from 'src/app/services/libros.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css'],
})
export class PrestamosComponent implements OnInit {
  @ViewChild('contenedorTabla') contenedorTabla: ElementRef;

  public prestamos: Prestamo[] = [];
  public libros: Libro[] = [];
  public usuarios: Usuario[] = [];
  public PrestamoSeleccionado: Prestamo | null;
  public isModalOpen = false;
  public isEditing: boolean = false;

  public get tituloModal(): string {
    return this.isEditing ? 'Editar prestamo' : 'Agregar prestamo';
  }

  public tableColumns: IDataTableColumn[] = [
    {
      name: 'Nombre',
      source: 'nombreUsuario',
    },
    {
      name: 'Libro',
      source: 'tituloLibro',
    },
    {
      name: 'Fecha de prestamo',
      source: 'dia_prestamo',
      pipe: DateFormatterPipe,
    },
    {
      name: 'Fecha de devolucion',
      source: 'dia_devolucion_estimativo',
      pipe: DateFormatterPipe,
    },
  ];

  constructor(private prestamosService: PrestamosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.prestamosService
      .cargarDatos()
      .subscribe(({ prestamos, libros, usuarios }) => {
        this.prestamos = prestamos;
        this.libros = libros;
        this.usuarios = usuarios;
      });
  }

  cargarDetallePrestamo(e: IDataTableSelectionChanged): void {
    let id = e.current.item['idPrestamo'];
    this.prestamosService.cargarPrestamoById(id).subscribe((data) => {
      this.PrestamoSeleccionado = data;
    });
  }

  eliminarPrestamo(): void {
    if (this.PrestamoSeleccionado && this.PrestamoSeleccionado.idPrestamo) {
      let id = this.PrestamoSeleccionado.idPrestamo as number;
      this.prestamosService.eliminarPrestamo(id).subscribe(() => {
        this.cargarDatos();
      });
    }
  }

  agregarPrestamo(Prestamo: Prestamo): void {
    this.prestamosService.agregarPrestamo(Prestamo).subscribe((data) => {
      this.isModalOpen = false;
      this.cargarDatos();
    });
  }

  editarPrestamo(Prestamo: Prestamo): void {
    this.prestamosService.editarPrestamo(Prestamo).subscribe(() => {
      this.isModalOpen = false;
      this.isEditing = false;
      this.cargarDatos();
    });
  }

  onSubmit(Prestamo: Prestamo) {
    if (this.isEditing) {
      this.editarPrestamo(Prestamo);
    } else {
      this.agregarPrestamo(Prestamo);
    }
    console.log(Prestamo);
  }

  onCancel() {
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
