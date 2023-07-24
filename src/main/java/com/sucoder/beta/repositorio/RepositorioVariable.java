package com.sucoder.beta.repositorio;

import com.sucoder.beta.modelo.Variable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioVariable extends JpaRepository<Variable, Long> {
    // You can define custom queries here if needed
}
