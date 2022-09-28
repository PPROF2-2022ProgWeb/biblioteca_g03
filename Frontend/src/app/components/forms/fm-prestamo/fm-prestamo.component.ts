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
import { Libro } from 'src/app/models/Libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Iconos } from 'src/app/utils/iconos.enum';

@Component({
  selector: 'app-fm-prestamo',
  templateUrl: './fm-prestamo.component.html',
  styleUrls: ['./fm-prestamo.component.css'],
})
export class FmPrestamoComponent implements OnInit, OnChanges {
  @Input() titulo = 'Titulo';
  @Input() prestamo: Prestamo | null | undefined;
  @Input() usuarios: Usuario[];
  @Input() libro: Libro | null;

  @Output('onSubmit') submit = new EventEmitter<Prestamo>();
  @Output('onCancel') cancel = new EventEmitter();
  public Iconos = Iconos;

  private getFechaDevolucionEstimada = (): Date => {
    let f = new Date(Date.now());
    f.setDate(f.getDate() + 15);
    return f;
  };

  public FormAgregarPrestamo = new FormGroup({
    afiliado: new FormControl(-1, [Validators.required, Validators.min(0)]),
    fecha_prestamo: new FormControl(
      formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'),
      [Validators.required]
    ),
    fecha_devolucion: new FormControl(
      formatDate(this.getFechaDevolucionEstimada(), 'yyyy-MM-dd', 'en')
    ),
  });

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.cargarUsuarios().subscribe(data => this.usuarios = data)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prestamo']) {
      this.prestamo = changes['prestamo'].currentValue;
      if (this.prestamo) {
        let f_prestamo = this.prestamo.dia_prestamo.toString();
        let f_devolucion = this.prestamo.dia_devolucion_estimativo.toString();
        this.FormAgregarPrestamo.get('afiliado')?.setValue(
          this.prestamo?.idUsuario
        );
        // this.FormAgregarPrestamo.get('libro')?.setValue(this.prestamo.idLibro);
        this.FormAgregarPrestamo.get('fecha_prestamo')?.setValue(
          formatDate(f_prestamo, 'yyyy-MM-dd', 'en')
        );
        this.FormAgregarPrestamo.get('fecha_devolucion')?.setValue(
          formatDate(f_devolucion, 'yyyy-MM-dd', 'en')
        );
      }
    }
  }

  onSubmit(): void {
    if (!this.FormAgregarPrestamo.valid) return;
    let { afiliado, fecha_prestamo, fecha_devolucion } =
      this.FormAgregarPrestamo.value;

    if (afiliado && fecha_devolucion && fecha_prestamo) {
      let f_prestamo = new Date(fecha_prestamo as string);
      f_prestamo.setDate(f_prestamo.getDate() + 1);

      let f_devolucion = new Date(fecha_devolucion as string);
      f_devolucion.setDate(f_devolucion.getDate() + 1);

      let prestamo = new Prestamo(
        this.prestamo?.idPrestamo || null,
        afiliado || 0,
        this.libro?.idLibro || 0,
        f_prestamo,
        f_devolucion,
        fecha_prestamo as string,
        fecha_devolucion as string
        );
        this.FormAgregarPrestamo.reset();
        this.submit.emit(prestamo);
    }

  }

  onCancel() {
    this.FormAgregarPrestamo.get('afiliado')?.setValue(-1);
    this.cancel.emit();
  }
}
