package com.proyecto.sucoderbackend.servicio;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.proyecto.sucoderbackend.modelo.Clave;
import com.proyecto.sucoderbackend.repositorio.ClaveRepositorio;

@Service
public class ClaveServicio {
    private final ClaveRepositorio claveRepositorio;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public ClaveServicio(ClaveRepositorio claveRepositorio, BCryptPasswordEncoder passwordEncoder) {
        this.claveRepositorio = claveRepositorio;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void inicializarClavePorDefecto() {

        // Verificar si ya existe un registro en la base de datos
        if (!claveRepositorio.existsById(1L)) {
            // Encriptar la contraseña por defecto y guardarla en la base de datos
            String contraseñaEncriptada = passwordEncoder.encode("profesorude");
            Clave clave = new Clave();
            clave.setPassword(contraseñaEncriptada);
            claveRepositorio.save(clave);
        }
    }

    //validar la clave
    public boolean validarClave(String contraseñaProporcionada) {

        // Obtener la contraseña almacenada en la base de datos
        Clave claveAlmacenada = claveRepositorio.findById(1L).orElse(null);

        if (claveAlmacenada != null) {
            // Comparar las contraseñas después de recortar espacios en blanco
            return passwordEncoder.matches(contraseñaProporcionada, claveAlmacenada.getPassword());
        } else {
            // Manejar el caso en el que no se encuentra una contraseña almacenada
            return false;
        }
    }
}

