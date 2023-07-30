package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import com.proyecto.sucoderbackend.servicio.ProcedimientoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProcedimientoControlador {

    private final ProcedimientoServicio procedimientoServicio;

    @Autowired
    public ProcedimientoControlador(ProcedimientoServicio procedimientoServicio) {
        this.procedimientoServicio = procedimientoServicio;
    }

    @PostMapping("/procedimientos")
    public ResponseEntity<String> guardarProcedimiento(@RequestBody Map<String, String> requestData) {
        String procedimientoData = requestData.get("data");
        Procedimiento procedimiento = new Procedimiento();
        procedimiento.setLine(procedimientoData); // Assuming you have a 'data' field in your Procedimiento entity
        procedimientoServicio.guardarProcedimiento(procedimiento);
        return ResponseEntity.ok("Procedimiento saved successfully!");
    }
}