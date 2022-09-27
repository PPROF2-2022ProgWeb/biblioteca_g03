package com.ar.Grupo3.data.factory;

import java.io.Serializable;

import com.ar.Grupo3.data.objects.classes.*;
import com.ar.Grupo3.data.objects.interfaces.DaoDevolucionIntf;
import com.ar.Grupo3.data.objects.interfaces.DaoLibroIntf;
import com.ar.Grupo3.data.objects.interfaces.DaoPrestamosIntf;
import com.ar.Grupo3.data.objects.interfaces.DaoReportesInt;
import com.ar.Grupo3.data.objects.interfaces.DaoUsuarioIntf;

public class FabricaDAO implements Serializable {
	
	private static final long serialVersionUID = -93933310251647313L;
	
	//Para generar instancia de Libro
	private static DaoLibroIntf libro;
	public static DaoLibroIntf obtenerLibro() {
		if(libro == null) {
			libro = new DaoLibroImpl();
		}
		return libro;
	}
	
	//Para generar instancia de Devolucion
	private static DaoDevolucionIntf devolucion;
	public static DaoDevolucionIntf obtenerDevolucion() {
		if(devolucion == null) {
			devolucion = new DaoDevolucionImpl();
		}
		return devolucion;
	}
	
	//Para generar instancia de Prestamos
	private static DaoPrestamosIntf prestamos;
	public static DaoPrestamosIntf obtenerPrestamos() {
		if(prestamos == null) {
			prestamos = new DaoPrestamosImpl();
		}
		return prestamos;
	}
	
	//Para generar instancia de Reporte
	private static DaoReportesInt reporte;
	public static DaoReportesInt obtenerReporte() {
		if(reporte == null) {
			reporte = new DaoReporteImpl();
		}
		return reporte;
	}
	
	//Para generar instancia de Usuario
	private static DaoUsuarioIntf usuario;
	public static DaoUsuarioIntf obtenerUsuario() {
		if(usuario == null) {
			usuario = new DaoUsuarioImpl();
		}
		return usuario;
	}
}
