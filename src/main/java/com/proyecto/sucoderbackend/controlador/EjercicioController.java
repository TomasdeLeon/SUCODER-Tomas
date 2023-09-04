package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import com.proyecto.sucoderbackend.servicio.EjercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // Other methods if needed
}