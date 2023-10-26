package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjercicioRepositorio extends JpaRepository<Ejercicio, Long> {

    // Aquí puedes definir métodos de consulta personalizados
}
