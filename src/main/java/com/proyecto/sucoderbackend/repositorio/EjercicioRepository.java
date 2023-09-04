package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {
    // You can add custom query methods here if needed
}
