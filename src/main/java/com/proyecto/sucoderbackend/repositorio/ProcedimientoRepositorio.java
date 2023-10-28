package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedimientoRepositorio extends JpaRepository<Procedimiento, Long> {

    // Agregar un método de consulta personalizado para obtener procedimientos por nombre y usuario
    Procedimiento obtenerProcedimientoPorNombreYUsuario(String nombreProcedimiento, String nombreUsuario);
}