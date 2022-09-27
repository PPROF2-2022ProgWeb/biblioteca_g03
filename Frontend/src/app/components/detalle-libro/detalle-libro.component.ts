import { Component, Input, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/Libro';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {
  @Input() libro: Libro;
  
  constructor() { }

  ngOnInit(): void {
  }

}
