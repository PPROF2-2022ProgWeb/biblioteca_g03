package com.ar.Grupo3.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "libro")
public class Libro implements Serializable {

	private static final long serialVersionUID = 3758029821424455768L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id_libro")
	private Long idLibro;

	@Column(name = "titulo")
	private String titulo;

	@Column(name = "autor")
	private String autor;

	@Column(name = "categoria")
	private String categoria;

	@Column(name = "editor")
	private String editor;

	@Column(name = "lenguajes")
	private String lenguajes;

	@Column(name = "paginas")
	private String paginas;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "stock")
	@Basic(optional = false)
	private Long stock;

	@Column(name = "disponibles")
	@Basic(optional = false)
	private Long disponibles;

	public Libro() {
		// Constructor Vacio
	}

	public Libro(Long idLibro) {
		this.idLibro = idLibro;
	}

	public Libro(Long idLibro, Long stock, Long disponibles) {
		this.idLibro = idLibro;
		this.stock = stock;
		this.disponibles = disponibles;
	}

	public Libro(Long idLibro, String titulo, String autor, String categoria, String editor, String lenguajes,
			String paginas, String descripcion, Long stock, Long disponibles) {
		this.idLibro = idLibro;
		this.titulo = titulo;
		this.autor = autor;
		this.categoria = categoria;
		this.editor = editor;
		this.lenguajes = lenguajes;
		this.paginas = paginas;
		this.descripcion = descripcion;
		this.stock = stock;
		this.disponibles = disponibles;
	}

	// Getterss and Setters
	public Long getIdLibro() {
		return idLibro;
	}

	public void setIdLibro(Long idLibro) {
		this.idLibro = idLibro;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getLenguajes() {
		return lenguajes;
	}

	public void setLenguajes(String lenguajes) {
		this.lenguajes = lenguajes;
	}

	public String getPaginas() {
		return paginas;
	}

	public void setPaginas(String paginas) {
		this.paginas = paginas;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Long getStock() {
		return stock;
	}

	public void setStock(Long stock) {
		this.stock = stock;
	}

	public Long getDisponibles() {
		return disponibles;
	}

	public void setDisponibles(Long disponibles) {
		this.disponibles = disponibles;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (idLibro != null ? idLibro.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof Libro)) {
			return false;
		}
		Libro other = (Libro) object;
		if ((this.idLibro == null && other.idLibro != null)
				|| (this.idLibro != null && !this.idLibro.equals(other.idLibro))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "Libro{" + "idLibro=" + idLibro + ", titulo=" + titulo + ", autor=" + autor + ", categoria=" + categoria
				+ ", editor=" + editor + ", lenguajes=" + lenguajes + ", paginas=" + paginas + ", descripcion="
				+ descripcion + ", stock=" + stock + ", disponibles=" + disponibles + '}';
	}

}
