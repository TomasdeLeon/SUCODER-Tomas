package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcedimientoRepositorio extends JpaRepository<Procedimiento, Long> {
    Procedimiento findByProcedureName(String nombreProcedimiento);
}