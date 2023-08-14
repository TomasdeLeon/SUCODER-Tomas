package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import com.proyecto.sucoderbackend.servicio.ProcedimientoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> guardarProcedimiento(@RequestBody String requestData) {
        String[] parts = requestData.split("\n", 2); // Split the data into procedure name and content
        String nombreProcedimiento = parts[0];
        String lineCharger = parts[1];

        Procedimiento procedimiento = new Procedimiento();
        procedimiento.setProcedureName(nombreProcedimiento);
        procedimiento.setLine(lineCharger);

        try {
            procedimientoServicio.guardarProcedimiento(procedimiento);
            return ResponseEntity.ok("Procedimiento saved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving procedimiento");
        }
    }

    @RequestMapping ("/fetchProcedure")
    public ResponseEntity<?> fetchProcedure(@RequestParam("nombre_procedimiento") String nombreProcedimiento) {
        try {
            String lineCharger = procedimientoServicio.obtenerLineChargerPorNombre(nombreProcedimiento);
            if (lineCharger != null) {
                return ResponseEntity.ok(Map.of("line_charger", lineCharger));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}