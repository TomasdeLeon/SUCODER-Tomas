package com.proyecto.sucoderbackend.servicio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import com.proyecto.sucoderbackend.repositorio.ProcedimientoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcedimientoServicio {

    private final ProcedimientoRepositorio procedimientoRepositorio;

    @Autowired
    public ProcedimientoServicio(ProcedimientoRepositorio procedimientoRepositorio) {
        this.procedimientoRepositorio = procedimientoRepositorio;
    }

    public void guardarProcedimiento(Procedimiento procedimiento) {
        procedimientoRepositorio.save(procedimiento);
    }
}