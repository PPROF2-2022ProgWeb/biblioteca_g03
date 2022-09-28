import { Component, Input, OnInit } from '@angular/core';
import { Devolucion } from 'src/app/models/Devolucion';

@Component({
  selector: 'app-detalle-devolucion',
  templateUrl: './detalle-devolucion.component.html',
  styleUrls: ['./detalle-devolucion.component.css']
})
export class DetalleDevolucionComponent implements OnInit {
  @Input() devolucion: Devolucion;
  constructor() { }

  ngOnInit(): void {
  }

}
