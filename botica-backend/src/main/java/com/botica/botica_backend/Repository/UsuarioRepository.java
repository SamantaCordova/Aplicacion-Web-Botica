package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Buscar usuario por email (para login)
    Optional<Usuario> findByEmail(String email);

    // Buscar usuario activo por email
    Optional<Usuario> findByEmailAndActivoTrue(String email);

    // Buscar usuarios por rol (por si quieres admin, cliente, etc.)
    List<Usuario> findByRol(String rol);
}
