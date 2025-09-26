package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    // Consulta opcional: buscar proveedor por RUC
    Optional<Proveedor> findByRUC(String ruc);
}
