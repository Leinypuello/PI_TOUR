package com.tourslp.tourslp.controller;


import com.tourslp.tourslp.dto.JwtResponse;
import com.tourslp.tourslp.dto.LoginRequest;
import com.tourslp.tourslp.dto.RegisterRequest;
import com.tourslp.tourslp.entity.User;
import com.tourslp.tourslp.security.JwtService;
import com.tourslp.tourslp.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name())
                .replaceAll("\n", "")
                .replaceAll("\r", "");
        return ResponseEntity.ok(new JwtResponse(token,user.getRole().name()));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        JwtResponse token = authService.login(request);
        return ResponseEntity.ok(token);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/register")
    public ResponseEntity<User> adminRegister(@RequestBody RegisterRequest request) {
        User user = authService.adminRegister(request);
        return ResponseEntity.ok(user);
    }
}
