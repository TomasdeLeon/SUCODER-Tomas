package com.proyecto.sucoderbackend.servicio;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import com.proyecto.sucoderbackend.repositorio.ProcedimientoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Procedimiento obtenerProcedimientoPorNombreYUsuario(String nombreProcedimiento, String nombreUsuario) {
        // Busca el procedimineto por el nombre y el nombre de usuario
        return procedimientoRepositorio.obtenerProcedimientoPorNombreYUsuario(nombreProcedimiento, nombreUsuario);
    }

}