package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.servicio.ClaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ClaveController {
    private final ClaveService claveService;

    @Autowired
    public ClaveController(ClaveService claveService) {
        this.claveService = claveService;
    }

    @PostMapping("/validateClave")
    public ResponseEntity<String> validateClave(@RequestBody Map<String, String> requestBody) {
        String providedClave = requestBody.get("password");
        boolean isPasswordValid = claveService.validatePassword(providedClave);

        if (isPasswordValid) {
            return ResponseEntity.ok("Clave is correct");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Clave is incorrect");
        }
    }
}
