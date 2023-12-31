package com.proyecto.sucoderbackend.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "procedimientos")
public class Procedimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "line_charger", length = 1000)
    private String line;

    @Column(name = "nombre_procedimiento")
    private String procedureName;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;
}
