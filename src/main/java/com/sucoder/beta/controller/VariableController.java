package com.sucoder.beta.controller;

import com.sucoder.beta.modelo.Variable;
import com.sucoder.beta.servicio.ServicioVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/variables")
public class VariableController {

    private final ServicioVariable variableService;

    @Autowired
    public VariableController(ServicioVariable variableService) {
        this.variableService = variableService;
    }

    @GetMapping
    public List<Variable> getAllVariables() {
        return variableService.getAllVariables();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Variable> getVariableById(@PathVariable Long id) {
        Optional<Variable> variable = variableService.getVariableById(id);
        return variable.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Variable> createVariable(@RequestBody Variable variable) {
        Variable createdVariable = variableService.saveVariable(variable);
        return new ResponseEntity<>(createdVariable, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVariable(@PathVariable Long id) {
        variableService.deleteVariableById(id);
        return ResponseEntity.noContent().build();
    }

    /*@PutMapping("/{id}")
    public ResponseEntity<Variable> updateVariable(@PathVariable Long id, @RequestBody Variable variable) {
        Variable updatedVariable = variableService.updateVariable(id, variable);
        if (updatedVariable != null) {
            return ResponseEntity.ok(updatedVariable);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
}
