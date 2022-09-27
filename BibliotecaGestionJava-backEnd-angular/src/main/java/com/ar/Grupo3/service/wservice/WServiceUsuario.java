package com.ar.Grupo3.service.wservice;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ar.Grupo3.data.factory.FabricaDAO;
import com.ar.Grupo3.data.objects.interfaces.DaoUsuarioIntf;
import com.ar.Grupo3.model.Usuario;

@RestController
@RequestMapping({ "/Biblioteca" })
public class WServiceUsuario implements Serializable {

	private static final long serialVersionUID = -312339292846758441L;

	@Autowired
	private DaoUsuarioIntf servicioUsuario = FabricaDAO.obtenerUsuario();

	/*
	 * ----------------------------------------------------------------------------
	 * Usuario
	 * ----------------------------------------------------------------------------
	 */
	@GetMapping(path = "/usuario")
	public List<Usuario> mostrarUsuarios() {
		List<Usuario> listaReporte = mostrar();
		return listaReporte;
	}

	@GetMapping(path = "/usuario/{id}")
	public Optional<?> buscarUsuarios(@PathVariable("id") Long id) {
		return buscarPorId(id);
	}

	@PostMapping(path = "/usuario/agregar")
	public Usuario AgregarUsuario(@RequestBody Usuario usuario) {
		return agregar(usuario);
	}

	@PutMapping(path = "/usuario/modificar/{id}")
	public ResponseEntity<Usuario> modificarUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
		if (usuario != null) {
			modificar(usuario, id);
			return new ResponseEntity<Usuario>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Usuario>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(path = "/usuario/eliminar/{id}")
	public ResponseEntity<Usuario> eliminarUsuario(@PathVariable("id") Long id) {

		int var = eliminar(id);
		if (var == 0) {
			return new ResponseEntity<Usuario>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Usuario>(HttpStatus.NOT_FOUND);
		}
	}

	// __________________________________________________________________________________
	// Logica
	// __________________________________________________________________________________

	// Bucamos todos las Usuarioes
	public List<Usuario> mostrar() {
		return servicioUsuario.SelectTodos();
	}

	// Buscamos un Usuario por ID
	public Optional<?> buscarPorId(Long id) {
		return servicioUsuario.selectPorId(id);
	}

	// Agregamos un por ID
	public Usuario agregar(Usuario Usuario) {
		servicioUsuario.agregar(Usuario);
		return Usuario;
	}

	// modificamos Usuario
	public void modificar(Usuario UsuarioModificado, Long id) {
		// Verificamos que no nos llegue nulo el id
		if (id != null) {
			Optional<?> busca = servicioUsuario.selectPorId(id);
			// Ahora si modificamos la Usuario
			if (busca != null) {
				servicioUsuario.modificar(UsuarioModificado);
			}
		}
	}

	// Eliminamos la Usuario, no se para que esto dudo que pase a menos que...
	public Integer eliminar(Long id) {
		Integer aux = 1;
		// nos fijamos que no nos llegue nulo
		try {
			if (id != null) {
				Usuario elimina = new Usuario(id);
				// eliminar el Usuario
				if (elimina != null) {
					servicioUsuario.borrar(elimina);
					aux = 0;
				}
			}
		} catch (Exception e) {
			LogManager.getLogger("Un error ha ocurrido: -> { " + e.getMessage() + " } fin del error preguntar al Grupo 3 ==> GestorStock ");
		}
		return aux;
	}
}
