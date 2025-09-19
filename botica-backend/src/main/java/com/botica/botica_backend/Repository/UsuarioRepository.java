package com.botica.botica_backend.Repository;

import com.botica.botica_backend.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Aquí puedes agregar consultas personalizadas si quieres
    // Por ejemplo, buscar usuario por email
    Optional<Usuario> findByEmail(String email);
}