import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { DataCounterComponent } from './components/data-counter/data-counter.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavlinkComponent } from './components/navlink/navlink.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { LogoComponent } from './components/logo/logo.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { DevolucionesComponent } from './pages/devoluciones/devoluciones.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FmLibroComponent } from './components/forms/fm-libro/fm-libro.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { AvisoComponent } from './components/aviso/aviso.component';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { FmUsuarioComponent } from './components/forms/fm-usuario/fm-usuario.component';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { FmPrestamoComponent } from './components/forms/fm-prestamo/fm-prestamo.component';
import { DetallePrestamoComponent } from './components/detalle-prestamo/detalle-prestamo.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    ButtonComponent,
    DataCounterComponent,
    DataTableComponent,
    IconComponent,
    MenuComponent,
    ModalComponent,
    NoEncontradoComponent,
    DynamicPipe,
    NavlinkComponent,
    LogoComponent,
    ReportesComponent,
    LibrosComponent,
    DevolucionesComponent,
    PrestamosComponent,
    UsuariosComponent,
    FmLibroComponent,
    InputContainerComponent,
    AvisoComponent,
    DetalleLibroComponent,
    DetalleUsuarioComponent,
    FmUsuarioComponent,
    DateFormatterPipe,
    FmPrestamoComponent,
    DetallePrestamoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DateFormatterPipe, DynamicPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }