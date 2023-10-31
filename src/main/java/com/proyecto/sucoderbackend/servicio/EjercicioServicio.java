package com.proyecto.sucoderbackend.servicio;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import com.proyecto.sucoderbackend.repositorio.EjercicioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EjercicioServicio {
    private final EjercicioRepositorio ejercicioRepositorio;

    @Autowired
    public EjercicioServicio(EjercicioRepositorio ejercicioRepositorio) {
        this.ejercicioRepositorio = ejercicioRepositorio;
    }

    //metodo para obtener todos los ejercicios
    public List<Ejercicio> obtenerTodosLosEjercicios() {
        return ejercicioRepositorio.findAll();
    }

    //metodo para guardar ejercicio
    public Ejercicio guardarEjercicio(Ejercicio ejercicio) {
        return ejercicioRepositorio.save(ejercicio);
    }
}