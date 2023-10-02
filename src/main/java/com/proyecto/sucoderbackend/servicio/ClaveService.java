package com.proyecto.sucoderbackend.servicio;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.proyecto.sucoderbackend.modelo.Clave;
import com.proyecto.sucoderbackend.repositorio.ClaveRepository;

@Service
public class ClaveService {
    private final ClaveRepository claveRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public ClaveService(ClaveRepository claveRepository, BCryptPasswordEncoder passwordEncoder) {
        this.claveRepository = claveRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initializeDefaultPassword() {
        // Check if a record already exists in the database
        if (!claveRepository.existsById(1L)) {
            // Encrypt the default password and save it in the database
            String encryptedPassword = passwordEncoder.encode("profesorude");
            Clave clave = new Clave();
            clave.setPassword(encryptedPassword);
            claveRepository.save(clave);
        }
    }

    public boolean validatePassword(String providedPassword) {
        // Retrieve the stored password from the database (modify this logic based on your actual database setup)
        Clave storedClave = claveRepository.findById(1L).orElse(null);

        if (storedClave != null) {
            // Trim both passwords and then compare
            return passwordEncoder.matches(providedPassword, storedClave.getPassword());
        } else {
            // Handle the case where no stored password is found (e.g., return false)
            return false;
        }
    }
}
