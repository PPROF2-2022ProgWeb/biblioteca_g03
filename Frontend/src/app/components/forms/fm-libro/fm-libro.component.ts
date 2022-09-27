import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Libro } from 'src/app/models/Libro';
import { Iconos } from 'src/app/utils/iconos.enum';

@Component({
  selector: 'app-fm-libro',
  templateUrl: './fm-libro.component.html',
  styleUrls: ['./fm-libro.component.css'],
})
export class FmLibroComponent implements OnChanges {
  @Input() titulo = 'Titulo';
  @Input() libro: Libro | null | undefined;

  @Output('onSubmit') submit = new EventEmitter<Libro>();
  @Output('onCancel') cancel = new EventEmitter();
  public Iconos = Iconos;

  public FormAgregarLibro = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    editor: new FormControl('', [Validators.required]),
    lenguajes: new FormControl('', [Validators.required]),
    paginas: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    disponibles: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libro']) {
      this.libro = changes['libro'].currentValue;

      if (this.libro) {
        this.FormAgregarLibro.get('titulo')?.setValue(this.libro?.titulo || '');
        this.FormAgregarLibro.get('autor')?.setValue(this.libro?.autor || '');
        this.FormAgregarLibro.get('descripcion')?.setValue(
          this.libro?.descripcion || ''
        );
        this.FormAgregarLibro.get('categoria')?.setValue(
          this.libro?.categoria || ''
        );
        this.FormAgregarLibro.get('editor')?.setValue(this.libro?.editor || '');
        this.FormAgregarLibro.get('lenguajes')?.setValue(
          this.libro?.lenguajes || ''
        );
        this.FormAgregarLibro.get('paginas')?.setValue(
          this.libro?.paginas || ''
        );
        this.FormAgregarLibro.get('stock')?.setValue(String(this.libro?.stock));
        this.FormAgregarLibro.get('disponibles')?.setValue(
          String(this.libro?.disponibles)
        );
      }
    }
  }

  onSubmit(): void {
    if (!this.FormAgregarLibro.valid) return;
    let {
      titulo,
      autor,
      descripcion,
      categoria,
      disponibles,
      editor,
      lenguajes,
      paginas,
      stock,
    } = this.FormAgregarLibro.value;

    let libro = new Libro(
      this.libro?.idLibro || null,
      titulo || '',
      autor || '',
      categoria || '',
      editor || '',
      lenguajes || '',
      paginas || '',
      descripcion || '',
      Number(stock),
      Number(disponibles)
    );

    this.submit.emit(libro);
  }

  onCancel() {
    this.cancel.emit();
  }
}
