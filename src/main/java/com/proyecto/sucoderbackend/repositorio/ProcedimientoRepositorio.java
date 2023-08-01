package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcedimientoRepositorio extends JpaRepository<Procedimiento, Long> {
}
