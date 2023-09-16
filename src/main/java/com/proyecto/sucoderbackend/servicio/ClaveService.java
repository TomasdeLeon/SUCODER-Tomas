package com.proyecto.sucoderbackend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyecto.sucoderbackend.modelo.Clave;
import com.proyecto.sucoderbackend.repositorio.ClaveRepository;

@Service
public class ClaveService {
    private final ClaveRepository claveRepository;

    @Autowired
    public ClaveService(ClaveRepository claveRepository) {
        this.claveRepository = claveRepository;
    }

    public boolean validatePassword(String providedPassword) {
        // Retrieve the stored password from the database (modify this logic based on your actual database setup)
        Clave storedClave = claveRepository.findById(1L).orElse(null);

        if (storedClave != null) {
            // Trim both passwords and then compare
            return storedClave.getPassword().trim().equals(providedPassword.trim());
        } else {
            // Handle the case where no stored password is found (e.g., return false)
            return false;
        }
    }
}
