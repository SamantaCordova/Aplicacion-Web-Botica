package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Detalle_pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DetallePedidoRepository extends JpaRepository<Detalle_pedido, Long> {
    // Buscar detalles de un pedido específico
    List<Detalle_pedido> findByPedidoIdPedido(Long idPedido);
}
