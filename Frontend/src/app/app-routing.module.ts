import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DevolucionesComponent } from './pages/devoluciones/devoluciones.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {path: '', component: DashboardLayoutComponent, children: [
    {path: '', component: ReportesComponent},
    {path: 'libros', component: LibrosComponent},
    {path: 'prestamos', component: PrestamosComponent},
    {path: 'devoluciones', component: DevolucionesComponent},
    {path: 'usuarios', component: UsuariosComponent},
  ]},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
