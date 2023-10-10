package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedimientoRepositorio extends JpaRepository<Procedimiento, Long> {
    Procedimiento findByProcedureName(String nombreProcedimiento);

    // Add a custom query method to fetch procedures by name and user
    Procedimiento findByProcedureNameAndNombreUsuario(String nombreProcedimiento, String nombreUsuario);
}