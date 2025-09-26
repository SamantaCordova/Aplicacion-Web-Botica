package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Detalle_pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<Detalle_pedido, Long> {
    // Buscar detalles de un pedido específico
    List<Detalle_pedido> findByPedidoIdPedido(Long idPedido);
}
