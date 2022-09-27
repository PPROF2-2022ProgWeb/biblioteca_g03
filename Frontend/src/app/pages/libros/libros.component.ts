import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IDataTableColumn,
  IDataTableSelectionChanged,
} from 'src/app/interfaces/dataTable';
import { Libro } from 'src/app/models/Libro';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  @ViewChild('contenedorTabla') contenedorTabla: ElementRef;

  public Libros: Libro[] = [];
  public LibroSeleccionado: Libro | null;
  public isModalOpen = false;
  public isEditing: boolean = false;

  public get tituloModal(): string {
    return this.isEditing ? 'Editar libro' : 'Agregar libro';
  }

  public tableColumns: IDataTableColumn[] = [
    {
      name: 'Titulo',
      source: 'titulo',
    },
    {
      name: 'Autor',
      source: 'autor',
    },
    {
      name: 'Categoria',
      source: 'categoria',
    },
    {
      name: 'Editor',
      source: 'editor',
    },
    {
      name: 'Stock',
      source: 'stock',
    },
    {
      name: 'Disponibles',
      source: 'disponibles',
    },
  ];

  constructor(private librosService: LibrosService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    return this.librosService.cargarLibros().subscribe((data) => {
      this.Libros = data;
      this.LibroSeleccionado = null;
    });
  }

  cargarDetalleLibro(e: IDataTableSelectionChanged): void {
    let id = e.current.item['idLibro'];
    this.librosService.buscarLibroById(id).subscribe((data) => {
      this.LibroSeleccionado = data;
    });
  }

  editarLibro(libro: Libro): void {
    this.librosService.editarLibro(libro).subscribe(() => {
      this.isModalOpen = false;
      this.isEditing = false;
      this.cargarLibros();
    });
  }

  agregarLibro(libro: Libro) {
    this.librosService.agregarLibro(libro).subscribe(() => {
      this.isModalOpen = false;
      this.cargarLibros();
    });
  }

  eliminarLibro(){
    if(this.LibroSeleccionado && this.LibroSeleccionado.idLibro){
      let id = this.LibroSeleccionado.idLibro as number
      this.librosService.eliminarLibro(id).subscribe(() => {
        this.cargarLibros();
      });
    }
  }

  onSubmit(libro: Libro) {
    if (this.isEditing) {
      this.editarLibro(libro);
    } else {
      this.agregarLibro(libro);
    }
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
