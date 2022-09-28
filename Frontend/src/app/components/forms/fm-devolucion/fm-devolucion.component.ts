import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Devolucion } from 'src/app/models/Devolucion';
import { Libro } from 'src/app/models/Libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { Usuario } from 'src/app/models/Usuario';
import { Iconos } from 'src/app/utils/iconos.enum';

@Component({
  selector: 'app-fm-devolucion',
  templateUrl: './fm-devolucion.component.html',
  styleUrls: ['./fm-devolucion.component.css'],
})
export class FmDevolucionComponent implements OnInit, OnChanges {
  @Input() titulo = 'Titulo';
  @Input() devolucion: Devolucion | null | undefined;
  @Input() prestamos: Prestamo[];
  @Input() usuarios: Usuario[];
  @Input() libros: Libro[];

  @Output('onSubmit') submit = new EventEmitter<Devolucion>();
  @Output('onCancel') cancel = new EventEmitter();

  public Iconos = Iconos;
  public prestamosUsuario: Prestamo[] = [];

  public FormAgregarPrestamo = new FormGroup({
    afiliado: new FormControl(-1, [Validators.required]),
    prestamo: new FormControl({ value: -1, disabled: true }, [
      Validators.required,
    ]),
    fecha_devolucion: new FormControl(
      formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')
    ),
    observaciones: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.FormAgregarPrestamo.get('afiliado')?.valueChanges.subscribe(
      (idUsuario) => {
        this.prestamosUsuario = this.prestamos.filter(
          (p: Prestamo) => p.idUsuario === Number(idUsuario)
        );
        let campoPrestamo = this.FormAgregarPrestamo.get('prestamo');
        this.prestamosUsuario.length > 0
          ? campoPrestamo?.enable()
          : campoPrestamo?.disable();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devolucion']) {
      this.devolucion = changes['devolucion'].currentValue;
      if (this.devolucion) {
        console.log(this.devolucion);
        this.FormAgregarPrestamo.get('afiliado')?.setValue(this.devolucion.idUsuario)
        this.FormAgregarPrestamo.get('prestamo')?.setValue(this.devolucion.idPrestamo)
        this.FormAgregarPrestamo.get('fecha_devolucion')?.setValue(this.devolucion.fechaRegreso)
        this.FormAgregarPrestamo.get('observaciones')?.setValue(this.devolucion.descripcion)
      }
    }
  }

  onSubmit(): void {
    if (!this.FormAgregarPrestamo.valid) return;
    let {
      afiliado: idAfiliado,
      prestamo: idPrestamo,
      fecha_devolucion,
      observaciones,
    } = this.FormAgregarPrestamo.value;

    if (idAfiliado && idPrestamo && fecha_devolucion) {
      let prestamo = this.prestamosUsuario.find((p) => p.idPrestamo === Number(idPrestamo));
      if (prestamo) {
        console.log('prestamo ok')
        let devolucion = new Devolucion(
          this.devolucion?.idDevolucion || null,
          idAfiliado,
          prestamo.idLibro,
          idPrestamo,
          fecha_devolucion,
          observaciones || ''
        );
        this.FormAgregarPrestamo.reset();
        this.submit.emit(devolucion);
      }
    }
  }

  onCancel() {
    this.FormAgregarPrestamo.reset();
    this.cancel.emit();
  }
}
