package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Buscar productos activos
    List<Producto> findByActivoTrue();

    // Buscar productos por categoría
    List<Producto> findByCategoriaIdCategoria(Long idCategoria);

    // Buscar productos por proveedor
    List<Producto> findByProveedorIdProveedor(Long idProveedor);
}
