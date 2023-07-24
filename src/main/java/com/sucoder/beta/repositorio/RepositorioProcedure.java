package com.sucoder.beta.repositorio;

import com.sucoder.beta.modelo.Procedure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioProcedure extends JpaRepository<Procedure, Long> {
    // You can add custom query methods here if needed
}
