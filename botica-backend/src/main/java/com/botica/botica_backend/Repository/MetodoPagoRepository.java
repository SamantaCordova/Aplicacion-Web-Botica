package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Metodo_pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MetodoPagoRepository extends JpaRepository<Metodo_pago, Long> {
    // Buscar métodos de pago activos
    List<Metodo_pago> findByActivoTrue();
}
