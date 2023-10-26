package com.proyecto.sucoderbackend.controlador;

import com.proyecto.sucoderbackend.servicio.ClaveServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ClaveControlador {
    private final ClaveServicio claveServicio;

    @Autowired
    public ClaveControlador(ClaveServicio claveServicio) {
        this.claveServicio = claveServicio;
    }

    @PostMapping("/validarClave")
    public ResponseEntity<String> validarClave(@RequestBody Map<String, String> requestBody) {
        String claveProporcionada = requestBody.get("password");
        boolean esClaveValida = claveServicio.validarClave(claveProporcionada);

        if (esClaveValida) {
            return ResponseEntity.ok("La clave es correcta");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("La clave es incorrecta");
        }
    }
}

