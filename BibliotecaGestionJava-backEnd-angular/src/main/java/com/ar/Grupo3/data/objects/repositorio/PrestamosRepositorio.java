package com.ar.Grupo3.data.objects.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ar.Grupo3.model.Prestamos;

@Repository
public interface PrestamosRepositorio extends JpaRepository<Prestamos, Long> {

}
