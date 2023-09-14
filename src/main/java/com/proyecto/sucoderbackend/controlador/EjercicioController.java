package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import com.proyecto.sucoderbackend.servicio.EjercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") // Base URL for the controller
public class EjercicioController {
    private final EjercicioService ejercicioService;

    @Autowired
    public EjercicioController(EjercicioService ejercicioService) {
        this.ejercicioService = ejercicioService;
    }

    @GetMapping("/ejercicios")
    public List<Ejercicio> getEjercicios() {
        return ejercicioService.getAllExercises();
    }

    @PostMapping("/uploadEjercicios")
    public ResponseEntity<String> uploadEjercicios(@RequestBody Ejercicio ejercicio) {
        try {
            ejercicioService.saveEjercicio(ejercicio);
            return ResponseEntity.ok("Ejercicio uploaded successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading ejercicio");
        }
    }
}