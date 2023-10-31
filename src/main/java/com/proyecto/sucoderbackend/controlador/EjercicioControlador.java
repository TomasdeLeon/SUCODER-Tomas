package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import com.proyecto.sucoderbackend.servicio.EjercicioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") // URL base para el controlador
public class EjercicioControlador {
    private final EjercicioServicio ejercicioServicio;

    @Autowired
    public EjercicioControlador(EjercicioServicio ejercicioServicio) {
        this.ejercicioServicio = ejercicioServicio;
    }

    @GetMapping("/ejercicios")
    public List<Ejercicio> obtenerEjercicios() {
        //obtener ejercicios
        return ejercicioServicio.obtenerTodosLosEjercicios();
    }

    @PostMapping("/subirEjercicios")
    public ResponseEntity<String> subirEjercicios(@RequestBody Ejercicio ejercicio) {
        try {
            //guardar ejercicio
            ejercicioServicio.guardarEjercicio(ejercicio);
            return ResponseEntity.ok("¡Ejercicio subido exitosamente!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el ejercicio");
        }
    }
}