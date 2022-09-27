import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/app/models/Libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { Usuario } from 'src/app/models/Usuario';
import { Iconos } from 'src/app/utils/iconos.enum';

@Component({
  selector: 'app-fm-prestamo',
  templateUrl: './fm-prestamo.component.html',
  styleUrls: ['./fm-prestamo.component.css']
})
export class FmPrestamoComponent implements OnChanges {
  @Input() titulo = 'Titulo';
  @Input() prestamo: Prestamo | null | undefined;
  @Input() usuarios: Usuario[];
  @Input() libros: Libro[];

  @Output('onSubmit') submit = new EventEmitter<Prestamo>();
  @Output('onCancel') cancel = new EventEmitter();
  public Iconos = Iconos;

  private getFechaDevolucionEstimada = (): Date => {
    let f = new Date(Date.now());
    f.setDate(f.getDate() + 15)
    return f
  }

  public FormAgregarPrestamo = new FormGroup({
    afiliado: new FormControl(-1, [Validators.required]),
    libro: new FormControl(-1, [Validators.required]),
    fecha_prestamo: new FormControl(formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'), [Validators.required]),
    fecha_devolucion: new FormControl(formatDate(this.getFechaDevolucionEstimada(), 'yyyy-MM-dd', 'en')),
  });

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prestamo']) {
      this.prestamo = changes['prestamo'].currentValue;
      if(this.prestamo){
        let f_prestamo = this.prestamo.dia_prestamo.toString();
        let f_devolucion = this.prestamo.dia_devolucion_estimativo.toString();
        this.FormAgregarPrestamo.get('afiliado')?.setValue(this.prestamo?.idUsuario)
        this.FormAgregarPrestamo.get('libro')?.setValue(this.prestamo.idLibro)
        this.FormAgregarPrestamo.get('fecha_prestamo')?.setValue(formatDate(f_prestamo, 'yyyy-MM-dd', 'en'))
        this.FormAgregarPrestamo.get('fecha_devolucion')?.setValue(formatDate(f_devolucion, 'yyyy-MM-dd', 'en'))

        console.log(this.prestamo.dia_devolucion_estimativo)
        console.log(this.prestamo.dia_devolucion_estimativo.toLocaleDateString)
      }
      // if (this.prestamo) {
      //   this.FormAgregarPrestamo.get('nombre')?.setValue(this.prestamo?.nombre);
      //   this.FormAgregarPrestamo.get('apellido')?.setValue(
      //     this.prestamo?.apellido
      //   );
      //   this.FormAgregarPrestamo.get('domicilio')?.setValue(
      //     this.prestamo?.domicilio
      //   );
      //   this.FormAgregarPrestamo.get('telefono')?.setValue(
      //     this.prestamo?.telefono
      //   );
      //   this.FormAgregarPrestamo.get('sanciones')?.setValue(
      //     String(this.prestamo?.sanciones)
      //   );
      //   this.FormAgregarPrestamo.get('sanciones_monetarias')?.setValue(
      //     String(this.prestamo?.sancionesMonetarias)
      //   );
      // }
    }
  }

  onSubmit(): void {
    if (!this.FormAgregarPrestamo.valid) return;
    let { afiliado, libro, fecha_prestamo, fecha_devolucion } = this.FormAgregarPrestamo.value;
    
    let f_prestamo = new Date((fecha_prestamo as string))
    f_prestamo.setDate(f_prestamo.getDate() + 1)

    let f_devolucion = new Date((fecha_devolucion as string))
    f_devolucion.setDate(f_devolucion.getDate() + 1)

    console.log(`FP: ${f_prestamo} FD: ${f_devolucion}`)

    let prestamo = new Prestamo(
      this.prestamo?.idPrestamo || null,
      afiliado || 0,
      libro || 0,
      f_prestamo,
      f_devolucion,
      fecha_prestamo as string,
      fecha_devolucion as string
    );
    
    this.FormAgregarPrestamo.reset();
    this.submit.emit(prestamo);
  }

  onCancel() {
    this.FormAgregarPrestamo.reset();
    this.cancel.emit();
  }
}
