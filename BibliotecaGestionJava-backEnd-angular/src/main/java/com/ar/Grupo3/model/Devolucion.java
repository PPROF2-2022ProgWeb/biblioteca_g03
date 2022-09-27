package com.ar.Grupo3.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "devolucion")
public class Devolucion implements Serializable {

	private static final long serialVersionUID = 76566434481838711L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_devolucion")
    private Long idDevolucion;
    
    @Basic(optional = false)
    @Column(name = "id_usuario")
    private Long idUsuario;
    
    @Basic(optional = false)
    @Column(name = "id_libro")
    private Long idLibro;
    
    @Basic(optional = false)
    @Column(name = "id_prestamo")
    private Long idPrestamo;
    
    @Column(name = "fecha_regreso")
    private String fechaRegreso;
    
    @Column(name = "descripcion")
    private String descripcion;

    public Devolucion() {
        //Constructor vacio
    }    

    public Devolucion(Long idDevolucion) {
        this.idDevolucion = idDevolucion;
    }

    public Devolucion(Long idDevolucion, Long idUsuario, Long idLibro, Long idPrestamo, String fechaRegreso, String descripcion) {
        this.idDevolucion = idDevolucion;
        this.idUsuario = idUsuario;
        this.idLibro = idLibro;
        this.idPrestamo = idPrestamo;
        this.fechaRegreso = fechaRegreso;
        this.descripcion = descripcion;
    }

    public Devolucion(Long idDevolucion, Long idUsuario, Long idLibro, Long idPrestamo) {
        this.idDevolucion = idDevolucion;
        this.idUsuario = idUsuario;
        this.idLibro = idLibro;
        this.idPrestamo = idPrestamo;
    }

    //Getters And Setters
    public Long getIdDevolucion() {
        return idDevolucion;
    }

    public void setIdDevolucion(Long idDevolucion) {
        this.idDevolucion = idDevolucion;
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

    public String getFechaRegreso() {
        return fechaRegreso;
    }

    public void setFechaRegreso(String fechaRegreso) {
        this.fechaRegreso = fechaRegreso;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idDevolucion != null ? idDevolucion.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Devolucion)) {
            return false;
        }
        Devolucion other = (Devolucion) object;
        if ((this.idDevolucion == null && other.idDevolucion != null) || (this.idDevolucion != null && !this.idDevolucion.equals(other.idDevolucion))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Devolucion{" + "idDevolucion=" + idDevolucion + ", idUsuario=" 
                + idUsuario + ", idLibro=" + idLibro + ", idPrestamo=" + 
                idPrestamo + ", fechaRegreso=" + fechaRegreso + ", descripcion=" 
                + descripcion + '}';
    }

}
