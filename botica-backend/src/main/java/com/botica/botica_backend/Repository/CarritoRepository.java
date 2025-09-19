package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    // Buscar productos en el carrito de un usuario
    List<Carrito> findByUsuarioIdUsuario(Long idUsuario);
}
