package com.example.demo.Controllers;

import com.example.demo.DTOs.AuthenticationResponse;
import com.example.demo.Security.AuthenticationService;
import com.example.demo.DTOs.LoginRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Value("${jwt.expiry}")
    private Long expiresAt;

    private final AuthenticationService authService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequestDTO request) {
        UserDetails user = authService.authenticate(request.email(), request.password());

        String token = authService.generateToken(user);
        String role = user.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null);

        return ResponseEntity.ok(
                AuthenticationResponse.builder()
                        .token(token)
                        .role(role)
                        .expiresAt(expiresAt)
                        .build());


    }
}