package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.modelo.Procedimiento;
import com.proyecto.sucoderbackend.servicio.ProcedimientoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public ResponseEntity<String> guardarProcedimiento(@RequestBody Procedimiento procedimiento) {
        try {
            procedimientoServicio.guardarProcedimiento(procedimiento);
            return ResponseEntity.ok("Procedimiento saved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving procedimiento");
        }
    }

    @RequestMapping("/fetchProcedureByUser")
    public ResponseEntity<?> fetchProcedureByUser(@RequestBody Map<String, String> requestData, Principal principal) {
        try {
            String nombreProcedimiento = requestData.get("nombre_procedimiento");
            String nombreUsuario = requestData.get("nombre_usuario");

            // Check if the procedure exists for the given user
            Procedimiento procedimiento = procedimientoServicio.obtenerProcedimientoPorNombreYUsuario(nombreProcedimiento, nombreUsuario);

            if (procedimiento != null) {
                return ResponseEntity.ok(Map.of("line_charger", procedimiento.getLine()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Procedure not found for this user or access denied.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
