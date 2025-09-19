package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Buscar productos activos
    List<Producto> findByActivoTrue();
}
