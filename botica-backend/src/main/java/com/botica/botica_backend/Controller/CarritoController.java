package com.botica.botica_backend.Controller;

import com.botica.botica_backend.Service.CarritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @PostMapping("/{idUsuario}/vaciar")
    public ResponseEntity<Void> vaciar(@PathVariable Long idUsuario) {
        carritoService.vaciarCarrito(idUsuario);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{idCarrito}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long idCarrito) {
        carritoService.eliminarProducto(idCarrito);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{idCarrito}/cantidad")
    public ResponseEntity<Void> actualizarCantidad(@PathVariable Long idCarrito,
                                                   @RequestParam("cantidad") Integer cantidad) {
        carritoService.actualizarCantidad(idCarrito, cantidad);
        return ResponseEntity.noContent().build();
    }
}
