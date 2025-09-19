package com.botica.botica_backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "proveedores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProveedor;

    private String nombreComercial;
    private String RUC;
    private String telefono;
    private String correo;
    private String personaContacto;
    private String tipoProducto;
    private String condicionesPago;
    private Boolean estado;
    private LocalDate fechaRegistro;
}