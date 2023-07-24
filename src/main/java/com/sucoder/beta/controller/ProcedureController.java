package com.sucoder.beta.controller;

import com.sucoder.beta.modelo.Procedure;
import com.sucoder.beta.servicio.ServicioProcedure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/procedures")
public class ProcedureController {

    private final ServicioProcedure procedureService;

    @Autowired
    public ProcedureController(ServicioProcedure procedureService) {
        this.procedureService = procedureService;
    }

    @GetMapping
    public List<Procedure> getAllProcedures() {
        return procedureService.getAllProcedures();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Procedure> getProcedureById(@PathVariable Long id) {
        Optional<Procedure> procedure = procedureService.getProcedureById(id);
        return procedure.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Procedure> createProcedure(@RequestBody Procedure procedure) {
        Procedure createdProcedure = procedureService.saveProcedure(procedure);
        return new ResponseEntity<>(createdProcedure, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProcedure(@PathVariable Long id) {
        procedureService.deleteProcedureById(id);
        return ResponseEntity.noContent().build();
    }
}
