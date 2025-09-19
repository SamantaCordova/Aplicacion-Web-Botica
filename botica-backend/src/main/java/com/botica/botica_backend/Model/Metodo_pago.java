package com.botica.botica_backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "metodos_pago")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Metodo_pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMetodoPago;

    private String nombre;
    private String descripcion;
    private Boolean activo;
}

