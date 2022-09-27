package com.ar.Grupo3.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

	private static final long serialVersionUID = 2455537616913261015L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_usuario")
    private Long idUsuario;
    
	@Column(name = "nombre")
    private String nombre;
    
    @Column(name = "apellidousuario")
    private String apellido;
    
    @Column(name = "domicilio")
    private String domicilio;
    
    @Column(name = "telefono")
    private String telefono;
    
    @Column(name = "sanciones")
    private Long sanciones;
    
    @Basic(optional = false)
    @Column(name = "sanciones_monetarias")
    private Long sancionesMonetarias;

    public Usuario() {
        //Constructor Vacio
    }

    public Usuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Usuario(Long idUsuario, Long sancionesMonetarias) {
        this.idUsuario = idUsuario;
        this.sancionesMonetarias = sancionesMonetarias;
    }

    public Usuario(Long idUsuario, String nombre, String apellido, 
            String domicilio, String telefono, Long sanciones, 
            Long sancionesMonetarias) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.domicilio = domicilio;
        this.telefono = telefono;
        this.sanciones = sanciones;
        this.sancionesMonetarias = sancionesMonetarias;
    }

    //Getters And Setters
    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Long getSanciones() {
        return sanciones;
    }

    public void setSanciones(Long sanciones) {
        this.sanciones = sanciones;
    }

    public long getSancionesMonetarias() {
        return sancionesMonetarias;
    }

    public void setSancionesMonetarias(Long sancionesMonetarias) {
        this.sancionesMonetarias = sancionesMonetarias;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idUsuario != null ? idUsuario.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Usuario)) {
            return false;
        }
        Usuario other = (Usuario) object;
        if ((this.idUsuario == null && other.idUsuario != null) || (this.idUsuario != null && !this.idUsuario.equals(other.idUsuario))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Usuario{" + "idUsuario=" + idUsuario + ", nombre=" + nombre + 
                ", apellido=" + apellido + ", domicilio=" + 
                domicilio + ", telefono=" + telefono + ", sanciones=" + 
                sanciones + ", sancionesMonetarias=" + sancionesMonetarias + '}';
    }

}
