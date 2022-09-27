package com.ar.Grupo3.data.objects.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ar.Grupo3.model.Reporte;

@Repository
public interface ReporteRepositorio extends JpaRepository<Reporte, Long> {

}
