package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Buscar pedidos de un usuario
    List<Pedido> findByUsuarioIdUsuario(Long idUsuario);

    // Buscar pedidos por estado
    List<Pedido> findByEstado(String estado);
}
