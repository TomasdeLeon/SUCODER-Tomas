package com.proyecto.sucoderbackend.servicio;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import com.proyecto.sucoderbackend.repositorio.EjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EjercicioService {
    private final EjercicioRepository ejercicioRepository;

    @Autowired
    public EjercicioService(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }

    public List<Ejercicio> getAllExercises() {
        return ejercicioRepository.findAll();
    }

    public Ejercicio saveEjercicio(Ejercicio ejercicio) {
        return ejercicioRepository.save(ejercicio);
    }
}