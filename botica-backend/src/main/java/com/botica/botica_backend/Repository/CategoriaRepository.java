package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Buscar categorías activas
    List<Categoria> findByActivoTrue();
}
