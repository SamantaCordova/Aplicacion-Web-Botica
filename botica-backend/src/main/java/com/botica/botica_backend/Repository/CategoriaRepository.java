package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Buscar categorías activas
    List<Categoria> findByActivoTrue();
}
