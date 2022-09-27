package com.ar.Grupo3.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "reporte")
public class Reporte implements Serializable {

	private static final long serialVersionUID = 2745235738844097961L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_reporte")
    private Long idReporte;
    
    @Column(name = "id_usuario")
    private Long idUsuario;
    
    @Column(name = "id_libro")
    private Long idLibro;
    
    @Column(name = "id_prestamo")
    private Long idPrestamo;
    
    @Column(name = "id_devolucion")
    private Long idDevolucion;

    public Reporte() {
        //Constructor Vacio
    }

    public Reporte(Long idReporte, Long idUsuario, Long idLibro, 
            Long idPrestamo, Long idDevolucion) {
        this.idReporte = idReporte;
        this.idUsuario = idUsuario;
        this.idLibro = idLibro;
        this.idPrestamo = idPrestamo;
        this.idDevolucion = idDevolucion;
    }
   
    public Reporte(Long idReporte) {
        this.idReporte = idReporte;
    }
    
    //Getters and Setters
    public Long getIdReporte() {
        return idReporte;
    }

    public void setIdReporte(Long idReporte) {
        this.idReporte = idReporte;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(Long idLibro) {
        this.idLibro = idLibro;
    }

    public Long getIdPrestamo() {
        return idPrestamo;
    }

    public void setIdPrestamo(Long idPrestamo) {
        this.idPrestamo = idPrestamo;
    }

    public Long getIdDevolucion() {
        return idDevolucion;
    }

    public void setIdDevolucion(Long idDevolucion) {
        this.idDevolucion = idDevolucion;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idReporte != null ? idReporte.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Reporte)) {
            return false;
        }
        Reporte other = (Reporte) object;
        if ((this.idReporte == null && other.idReporte != null) || (this.idReporte != null && !this.idReporte.equals(other.idReporte))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Reporte{" + "idReporte=" + idReporte + ", idUsuario=" + 
                idUsuario + ", idLibro=" + idLibro + ", idPrestamo=" + idPrestamo + 
                ", idDevolucion=" + idDevolucion + '}';
    }

}
