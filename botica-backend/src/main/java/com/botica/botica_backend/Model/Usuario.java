package com.botica.botica_backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    private String email;
    private String password;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String direccion;
    private String rol;
    private Boolean activo;
    private LocalDate fechaRegistro;
}