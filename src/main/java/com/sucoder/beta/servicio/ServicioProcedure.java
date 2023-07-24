package com.sucoder.beta.servicio;

import com.sucoder.beta.modelo.Procedure;
import com.sucoder.beta.repositorio.RepositorioProcedure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioProcedure {

    private final RepositorioProcedure procedureRepository;

    @Autowired
    public ServicioProcedure(RepositorioProcedure procedureRepository) {
        this.procedureRepository = procedureRepository;
    }

    public List<Procedure> getAllProcedures() {
        return procedureRepository.findAll();
    }

    public Optional<Procedure> getProcedureById(Long id) {
        return procedureRepository.findById(id);
    }

    public Procedure saveProcedure(Procedure procedure) {
        return procedureRepository.save(procedure);
    }

    public void deleteProcedureById(Long id) {
        procedureRepository.deleteById(id);
    }
}
