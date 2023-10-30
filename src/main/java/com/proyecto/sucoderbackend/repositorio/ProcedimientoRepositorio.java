package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedimientoRepositorio extends JpaRepository<Procedimiento, Long> {

    // Metodo de consulta para obtener procedimineto por nombre de porcedimineto y nombre de usuario
    Procedimiento findByProcedureNameAndNombreUsuario(String nombreProcedimiento, String nombreUsuario);
}