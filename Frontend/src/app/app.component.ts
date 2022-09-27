import { Component } from '@angular/core';
import { LibrosService } from './services/libros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private librosService: LibrosService) {
    librosService.cargarLibros();
  }

}
