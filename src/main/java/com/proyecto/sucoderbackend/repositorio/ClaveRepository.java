package com.proyecto.sucoderbackend.repositorio;

import com.proyecto.sucoderbackend.modelo.Clave;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaveRepository extends JpaRepository<Clave, Long> {
    // You can define custom query methods here if needed
}