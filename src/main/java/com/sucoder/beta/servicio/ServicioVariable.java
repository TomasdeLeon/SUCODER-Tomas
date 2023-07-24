package com.sucoder.beta.servicio;

import com.sucoder.beta.modelo.Variable;
import com.sucoder.beta.repositorio.RepositorioVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioVariable {

    private final RepositorioVariable variableRepository;

    @Autowired
    public ServicioVariable(RepositorioVariable variableRepository) {
        this.variableRepository = variableRepository;
    }

    public List<Variable> getAllVariables() {
        return variableRepository.findAll();
    }

    public Optional<Variable> getVariableById(Long id) {
        return variableRepository.findById(id);
    }

    public Variable saveVariable(Variable variable) {
        return variableRepository.save(variable);
    }

    public void deleteVariableById(Long id) {
        variableRepository.deleteById(id);
    }
}
