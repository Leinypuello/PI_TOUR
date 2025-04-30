package com.tourslp.tourslp.service;

import com.tourslp.tourslp.dto.JwtResponse;
import com.tourslp.tourslp.dto.LoginRequest;
import com.tourslp.tourslp.dto.RegisterRequest;
import com.tourslp.tourslp.entity.Role;
import com.tourslp.tourslp.entity.User;
import com.tourslp.tourslp.repository.IUserRepository;
import com.tourslp.tourslp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // Registro público (solo CLIENT)
    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email ya registrado");
        }

        if (request.getRole() != Role.CLIENT) {
            throw new RuntimeException("Solo se puede registrar como CLIENT desde este endpoint");
        }

        return saveUser(request);
    }

    // Registro por parte del ADMIN (puede crear también ADMIN)
    public User adminRegister(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email ya registrado");
        }

        return saveUser(request);
    }

    // Login
    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // ✅ Limpieza del token antes de devolverlo
        String rawToken = jwtService.generateToken(user.getEmail(), user.getRole().name());
        String cleanToken = rawToken.replaceAll("\\n", "").replaceAll("\\r", "");
        return new JwtResponse(cleanToken, user.getRole().name());
    }

    // Método común de guardado
    private User saveUser(RegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        return userRepository.save(user);
    }
}
