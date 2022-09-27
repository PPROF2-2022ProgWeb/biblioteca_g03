import { Component, Input, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/models/Prestamo';

@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.css']
})
export class DetallePrestamoComponent implements OnInit {
  @Input() prestamo: Prestamo;
  constructor() { }

  ngOnInit(): void {
  }

}
