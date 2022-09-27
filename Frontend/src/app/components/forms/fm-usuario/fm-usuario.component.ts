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
import { Usuario } from 'src/app/models/Usuario';
import { Iconos } from 'src/app/utils/iconos.enum';

@Component({
  selector: 'app-fm-usuario',
  templateUrl: './fm-usuario.component.html',
  styleUrls: ['./fm-usuario.component.css'],
})
export class FmUsuarioComponent implements OnChanges {
  @Input() titulo = 'Titulo';
  @Input() usuario: Usuario | null | undefined;

  @Output('onSubmit') submit = new EventEmitter<Usuario>();
  @Output('onCancel') cancel = new EventEmitter();
  public Iconos = Iconos;

  public FormAgregarUsuario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    sanciones: new FormControl('', [Validators.required, Validators.min(0)]),
    sanciones_monetarias: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      this.usuario = changes['usuario'].currentValue;
      if (this.usuario) {
        this.FormAgregarUsuario.get('nombre')?.setValue(this.usuario?.nombre);
        this.FormAgregarUsuario.get('apellido')?.setValue(
          this.usuario?.apellido
        );
        this.FormAgregarUsuario.get('domicilio')?.setValue(
          this.usuario?.domicilio
        );
        this.FormAgregarUsuario.get('telefono')?.setValue(
          this.usuario?.telefono
        );
        this.FormAgregarUsuario.get('sanciones')?.setValue(
          String(this.usuario?.sanciones)
        );
        this.FormAgregarUsuario.get('sanciones_monetarias')?.setValue(
          String(this.usuario?.sancionesMonetarias)
        );
      }
    }
  }

  onSubmit(): void {
    if (!this.FormAgregarUsuario.valid) return;
    let {
      nombre,
      apellido,
      domicilio,
      telefono,
      sanciones,
      sanciones_monetarias,
    } = this.FormAgregarUsuario.value;

    let usuario = new Usuario(
      this.usuario?.idUsuario || null,
      nombre || '',
      apellido || '',
      domicilio || '',
      telefono || '',
      Number(sanciones),
      Number(sanciones_monetarias)
    );

    this.submit.emit(usuario);
  }

  onCancel() {
    this.cancel.emit();
  }
}
