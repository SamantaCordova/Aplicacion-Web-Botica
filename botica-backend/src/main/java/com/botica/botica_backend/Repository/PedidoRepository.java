package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Buscar pedidos de un usuario
    List<Pedido> findByUsuarioIdUsuario(Long idUsuario);
}
