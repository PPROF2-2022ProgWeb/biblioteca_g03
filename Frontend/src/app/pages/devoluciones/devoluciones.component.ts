import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IDataTableColumn, IDataTableSelectionChanged } from 'src/app/interfaces/dataTable';
import { Devolucion } from 'src/app/models/Devolucion';
import { Libro } from 'src/app/models/Libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { Usuario } from 'src/app/models/Usuario';
import { DateFormatterPipe } from 'src/app/pipes/date-formatter.pipe';
import { DevolucionesService } from 'src/app/services/devoluciones.service';
import { PrestamosService } from 'src/app/services/prestamos.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  @ViewChild('contenedorTabla') contenedorTabla: ElementRef;

  public devoluciones: Devolucion[];
  public libros: Libro[] = [];
  public usuarios: Usuario[] = [];
  public DevolucionSeleccionada: Devolucion | null;
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

  constructor(private devolucionesService: DevolucionesService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.devolucionesService
      .cargarDatos()
      .subscribe(({ devoluciones, libros, usuarios }) => {
        this.devoluciones = devoluciones;
        this.libros = libros;
        this.usuarios = usuarios;
      });
  }

  cargarDetalleDevolucion(e: IDataTableSelectionChanged): void {
    let id = e.current.item['idPrestamo'];
    this.devolucionesService.cargarDevolucionById(id).subscribe((data) => {
      this.DevolucionSeleccionada = data;
    });
  }

  eliminarDevolucion(): void {
    if (this.DevolucionSeleccionada && this.DevolucionSeleccionada.idDevolucion) {
      let id = this.DevolucionSeleccionada.idPrestamo as number;
      this.devolucionesService.eliminarDevolucion(id).subscribe(() => {
        this.cargarDatos();
      });
    }
  }

  agregarDevolucion(devolucion: Devolucion): void {
    this.devolucionesService.agregarDevolucion(devolucion).subscribe((data) => {
      this.isModalOpen = false;
      this.cargarDatos();
    });
  }

  editarDevolucion(devolucion: Devolucion): void {
    this.devolucionesService.editarDevolucion(devolucion).subscribe(() => {
      this.isModalOpen = false;
      this.isEditing = false;
      this.cargarDatos();
    });
  }

  onSubmit(devolucion: Devolucion) {
    if (this.isEditing) {
      this.editarDevolucion(devolucion);
    } else {
      this.agregarDevolucion(devolucion);
    }
    console.log(devolucion);
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
