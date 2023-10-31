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
    public ResponseEntity<?> guardarProcedimiento(@RequestBody Procedimiento procedimiento) {
        try {
            String procedureName = procedimiento.getProcedureName();
            String nombreUsuario = procedimiento.getNombreUsuario();

            // Verificar si un procedimiento con el mismo nombre existe para el usuario
            Procedimiento existingProcedure = procedimientoServicio.obtenerProcedimientoPorNombreYUsuario(procedureName, nombreUsuario);

            if (existingProcedure != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("A procedure with this name already exists for the current user.");
            }

            // No existe procedimiento con este nombre, guaradr el nuevo procedimiento
            procedimientoServicio.guardarProcedimiento(procedimiento);
            return ResponseEntity.ok("Procedimiento saved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving procedimiento");
        }
    }

    @RequestMapping("/obtenerProcedimientoPorUsuario")
    public ResponseEntity<?> obtenerProcedimientoPorUsuario(@RequestBody Map<String, String> datosSolicitud, Principal principal) {
        try {
            String nombreProcedimiento = datosSolicitud.get("nombre_procedimiento");
            String nombreUsuario = datosSolicitud.get("nombre_usuario");

            // Comprobar si el procedimiento existe para el usuario
            Procedimiento procedimiento = procedimientoServicio.obtenerProcedimientoPorNombreYUsuario(nombreProcedimiento, nombreUsuario);

            if (procedimiento != null) {
                return ResponseEntity.ok(Map.of("linea_cargadora", procedimiento.getLine()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Procedimiento no encontrado para este usuario o acceso denegado.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
